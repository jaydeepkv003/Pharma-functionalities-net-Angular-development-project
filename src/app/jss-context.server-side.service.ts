import { Injectable, Inject } from '@angular/core';
import { TransferState } from '@angular/platform-browser';
import { LayoutService } from '@sitecore-jss/sitecore-jss-angular';
import { JssContextService, jssKey } from './jss-context.service';
import { JssState } from './JssState';
import { Observable, of as observableOf } from 'rxjs';
import { JssDataFetcherService } from './jss-data-fetcher.service';
import { OAuthService } from 'angular-oauth2-oidc';
import { Router } from '@angular/router';

/**
 * Stores the JSS app's context (current route and Sitecore context data).
 * This implementation runs on the server (SSR) side; see jss-context.service.ts
 * for the implementation that runs on the client (browser) side.
 */
@Injectable()
export class JssContextServerSideService extends JssContextService {
  constructor(
    protected transferState: TransferState,
    protected layoutService: LayoutService,
    protected dataFetcher: JssDataFetcherService,
    protected oauthService: OAuthService,
		protected router: Router,
    // this initial state from sitecore is injected by server.bundle for "integrated" mode
    @Inject('JSS_SERVER_LAYOUT_DATA') private serverToSsrState: JssState,
  ) {
    super(transferState, layoutService, dataFetcher, oauthService, router);
  }

  changeRoute(route: string, language: string): Observable<JssState> {
    // console.log('Server route change to ' + route);

    // if the route is null we signal the JSS routing setup that a 'fetch error'
    // occurred, so that it properly sends a not found route from SSR data
    if (this.serverToSsrState.sitecore && !this.serverToSsrState.sitecore.route) {
      this.serverToSsrState.routeFetchError = {
        status: 404,
        statusText: 'Not Found',
        data: this.serverToSsrState,
      };
    }

    // read initial state from data injected via server.bundle wrapper
    this.state.next(this.serverToSsrState);

    // place the initial state into TransferState for the client
    this.transferState.set<JssState>(jssKey, this.serverToSsrState);

    return observableOf(this.serverToSsrState);
  }
}
