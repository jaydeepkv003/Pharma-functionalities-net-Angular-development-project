import { Injectable, } from '@angular/core';
import { TransferState, makeStateKey } from '@angular/platform-browser';
import {
  LayoutService,
  LayoutServiceError,
  LayoutServiceData,
} from '@sitecore-jss/sitecore-jss-angular';
import { map, shareReplay, catchError } from 'rxjs/operators';
import {
  Observable,
  of as observableOf,
  BehaviorSubject
} from 'rxjs';
import { JssState } from './JssState';
import { environment } from '../environments/environment';
import { JssDataFetcherService } from './jss-data-fetcher.service';
import { Router } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';
// import { isExperienceEditorActive } from '@sitecore-jss/sitecore-jss-angular';

export const jssKey = makeStateKey<JssState>('jss');

/**
 * Stores the JSS app's context (current route and Sitecore context data).
 * This implementation runs on the client (browser) side; see jss-context.server-side.service.ts
 * for the implementation that runs on the server (SSR) side.
 */
@Injectable()
export class JssContextService {
  // components can subscribe to this (or use getValue()) to get access to latest data from Layout Service,
  // as well as current language and server route
  state: BehaviorSubject<JssState>;

  constructor(
    protected transferState: TransferState,
    protected layoutService: LayoutService,
    protected dataFetcher: JssDataFetcherService,
    protected oauthService: OAuthService,
    protected router: Router
  ) {
    this.state = new BehaviorSubject<JssState>(new JssState());
  }

  // primarily invoked by JssRouteResolver on URL/route change
  changeRoute(route: string, language: string): Observable<JssState> {
    // on client initial load, retrieve initial state from server
    const foundInitialState = this.transferState.hasKey(jssKey);
    if (foundInitialState) {
      const jssState = this.transferState.get<JssState>(jssKey, null);

      // if (!isExperienceEditorActive()) {
      //   let claims: any = this.oauthService.getIdentityClaims();
      //   if (jssState.sitecore.route.fields.isProtectedPage.value && !claims) {
      //     console.log('#>>>> Go to login page', route);
      //     this.oauthService.initImplicitFlow(route);
      //     return;
      //   } else {
      //     this.transferState.remove(jssKey);
      //     this.state.next(jssState);
      //     return observableOf(jssState);
      //   }
      // } else {
        this.transferState.remove(jssKey);
        this.state.next(jssState);
        return observableOf(jssState);
      // }
    }

    const fetchOptions = {
      layoutServiceConfig: { host: environment.sitecoreApiHost },
      querystringParams: {
        sc_lang: language,
        sc_apikey: environment.sitecoreApiKey,
      },
      fetcher: this.dataFetcher.fetch,
    };

    const jssState$ = this.layoutService.getRouteData(route, fetchOptions).pipe(
      map(routeData => {
        const lsResult = routeData as LayoutServiceData;
        const result = new JssState();
        result.language = language;
        result.serverRoute = route;

        // if (!isExperienceEditorActive()) {

        //   let claims: any = this.oauthService.getIdentityClaims();
        //   if (lsResult.sitecore.route.fields.isProtectedPage.value && !claims) {
        //     console.log('#>>>> Go to login page', route);
        //     this.oauthService.initImplicitFlow(route);
        //     return result;
        //   } else {
        //     console.log('#>>>> Not a protected page or already logged in');
        result.sitecore = lsResult.sitecore ? lsResult.sitecore : null;
        //     return result;
        //   }
        // } else {
        return result;
        // }
      }),
      catchError((error: LayoutServiceError) => {
        const result = new JssState();
        result.language = language;
        result.serverRoute = route;
        result.routeFetchError = error;
        return observableOf(result);
      }),
      shareReplay(1)
    );

    // subscribe to it ourselves so we can maintain current state
    jssState$.subscribe(
      (jssState) => {
        this.state.next(jssState);
      }
    );

    return jssState$;
  }
}
