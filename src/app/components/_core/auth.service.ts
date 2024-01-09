import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { OAuthErrorEvent, OAuthService } from 'angular-oauth2-oidc';
import { BehaviorSubject, ReplaySubject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { IGNORE_URL } from '../../models/constants';
import { environment as env } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private isAuthenticatedSubject$ = new BehaviorSubject<boolean>(false);
  public isAuthenticated$ = this.isAuthenticatedSubject$.asObservable();

  private isDoneLoadingSubject$ = new ReplaySubject<boolean>();
  public isDoneLoading$ = this.isDoneLoadingSubject$.asObservable();

  /**
   * Publishes `true` if and only if (a) all the asynchronous initial
   * login calls have completed or errorred, and (b) the user ended up
   * being authenticated.
   *
   * In essence, it combines:
   *
   * - the latest known state of whether the user is authorized
   * - whether the ajax calls for initial log in have all been done
   */
  // public canActivateProtectedRoutes$: Observable<boolean> = combineLatest([
  //   this.isAuthenticated$,
  //   this.isDoneLoading$,
  // ]).pipe(map((values) => values.every((b) => b)));

  private navigateToLoginPage() {
    // TODO: Remember current URL
    this.router.navigateByUrl('/should-login');
  }

  constructor(private oauthService: OAuthService, private router: Router) {
    // Useful for debugging:
    // this.oauthService.events.subscribe((event) => {
    //   if (event instanceof OAuthErrorEvent) {
    //     console.error('OAuthErrorEvent Object:', event);
    //   } else {
    //     console.warn('OAuthEvent Object:', event);
    //   }
    // });

    // default to signup/signin policy on every initialization
    this.oauthService.customQueryParams = {
      p: env.auth.signUpSignInPolicy,
    };

    this.oauthService.events.subscribe((_) => {
      this.isAuthenticatedSubject$.next(
        this.oauthService.hasValidAccessToken()
      );
    });

    this.oauthService.events
      .pipe(filter((e) => ['token_received'].includes(e.type)))
      .subscribe((e) => this.oauthService.loadUserProfile());

    this.oauthService.events
      .pipe(
        filter((e) => ['session_terminated', 'session_error'].includes(e.type))
      )
      .subscribe((e) => this.navigateToLoginPage());

    this.oauthService.setupAutomaticSilentRefresh();
    this.redirectIfForgotPassword();
  }

  public redirectIfForgotPassword() {
    this.oauthService.events.subscribe((event) => {
      if (event instanceof OAuthErrorEvent) {
        if (
          event.params &&
          event.params['error_description'] &&
          event.params['error_description'].indexOf('AADB2C90118') > -1
        ) {
          const redirectUri = (typeof window !== "undefined" ? window.location.origin : '') + env.auth.redirectUri;
          const PasswordResetUrl =
            `${env.auth.loginUrl}?p=${env.auth.passwordResetPolicy}&client_id=${env.auth.clientId}` +
            `&nonce=defaultNonce&redirect_uri=${redirectUri}&scope=openid&response_type=id_token&prompt=login`;
          window.location.href = PasswordResetUrl;
        }
      }
    });
  }

  public runInitialLoginSequence(): Promise<void> {
    // 0. LOAD CONFIG:
    // First we have to check to see how the IdServer is
    return (
      this.oauthService
        .loadDiscoveryDocument(`${env.auth.issuer}.well-known/openid-configuration`)

        // For demo purposes, we pretend the previous call was very slow
        .then(() => { return Promise.resolve(); })

        // 1. HASH LOGIN:
        // Try to log in via hash fragment after redirect back
        // from IdServer from initImplicitFlow:
        .then(() => this.oauthService.tryLogin())

        .then((event) => {
          if (this.oauthService.hasValidAccessToken()) {
            this.isDoneLoadingSubject$.next(true);
            if (
              this.oauthService.state &&
              this.oauthService.state !== 'undefined' &&
              this.oauthService.state !== 'null'
            ) {
              let stateUrl = this.oauthService.state;
              if (IGNORE_URL.indexOf(stateUrl) > -1) {
                stateUrl = '/';
              }
              if (stateUrl.startsWith('/') === false) {
                stateUrl = decodeURIComponent(stateUrl);
              }
              console.log(`There was state of ${this.oauthService.state}, so we are sending you to: ${stateUrl}`);
              this.router.navigateByUrl(stateUrl);
            } else {
              if (
                IGNORE_URL.indexOf(this.router.url) > -1 ||
              this.router.url.indexOf('AADB2C90091') > -1 ||
              this.router.url.indexOf('id_token') > -1
              ) {
                this.router.navigateByUrl('/');
              }
            }
          } else {
            if (
              this.router.url.toLocaleLowerCase() === '/login' ||
              this.router.url.indexOf('AADB2C90091') > -1 ||
              this.router.url.indexOf('id_token') > -1
            ) {
              this.router.navigateByUrl('/');
            }
          }
        })
        .catch((err) => {
          this.isDoneLoadingSubject$.next(true);
          this.router.navigateByUrl('/');
          return Promise.reject(err);
        })
    );
  }

  public runInitialSequence(): Promise<void> {
    return (
      this.oauthService
        .loadDiscoveryDocument()
        .then(() => { return Promise.resolve(); })
        .catch((err) => {
          return Promise.reject(err);
        })
    );
  }

  public login(targetUrl?: string) {
    // Note: before version 9.1.0 of the library you needed to
    // call encodeURIComponent on the argument to the method.
    this.oauthService.initLoginFlow(targetUrl || this.router.url);
  }

  public logout() {
    this.oauthService.logOut();
  }
  public refresh() {
    this.oauthService.silentRefresh();
  }
  public hasValidToken() {
    return this.oauthService.hasValidAccessToken();
  }

  // These normally won't be exposed from a service like this, but
  // for debugging it makes sense.
  public get accessToken() {
    return this.oauthService.getAccessToken();
  }
  public get refreshToken() {
    return this.oauthService.getRefreshToken();
  }
  public get identityClaims() {
    return this.oauthService.getIdentityClaims();
  }
  public get idToken() {
    return this.oauthService.getIdToken();
  }
  public get logoutUrl() {
    return this.oauthService.logoutUrl;
  }
  public get state() {
    return this.oauthService.state;
  }
}
