import { Component, OnInit, OnDestroy, Inject, Renderer2 } from '@angular/core';
import { JssState } from '../../JssState';
import { ActivatedRoute } from '@angular/router';
import { MetaService } from '@ngx-meta/core';
import {
  RouteData,
  Field,
  LayoutServiceContextData,
} from '@sitecore-jss/sitecore-jss-angular';
import { Subscription } from 'rxjs';
import { AuthService } from '../../components/_core/auth.service';
import { DOCUMENT } from '@angular/common';
import { SharedService } from '../../_services/shared.service';

enum LayoutState {
  Layout,
  NotFound,
  Error,
}

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
})
export class LayoutComponent implements OnInit, OnDestroy {
  route: RouteData;
  state: LayoutState;
  LayoutState = LayoutState;
  subscription: Subscription;
  errorContextData: LayoutServiceContextData;
  structuredMarkupData: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private readonly meta: MetaService,
    private authService: AuthService,
    private _renderer2: Renderer2,
    public sharedService: SharedService,
    @Inject(DOCUMENT) private _document: Document
  ) { }

  ngOnInit() {
    // route data is populated by the JssRouteResolver
    this.subscription = this.activatedRoute.data.subscribe(
      (data: { jssState: JssState }) => {
        if (!data.jssState) {
          this.state = LayoutState.NotFound;
          return;
        }

        if (data.jssState.sitecore && data.jssState.sitecore.route) {
          if (this.isProtectedPage(data.jssState.sitecore.route.fields)) {
            return;
          }
          this.route = data.jssState.sitecore.route;
          this.setMetadata(this.route.fields);
          this.state = LayoutState.Layout;
        }

        if (data.jssState.routeFetchError) {
          if (
            data.jssState.routeFetchError.status >= 400 &&
            data.jssState.routeFetchError.status < 500
          ) {
            this.state = LayoutState.NotFound;
          } else {
            this.state = LayoutState.Error;
          }

          this.errorContextData =
            data.jssState.routeFetchError.data &&
            data.jssState.routeFetchError.data.sitecore;
        }
      }
    );
  }

  ngOnDestroy() {
    // important to unsubscribe when the component is destroyed
    this.subscription.unsubscribe();
  }

  setMetadata(routeFields: { [name: string]: Field }) {
    // set page title, if it exists
    if (routeFields && routeFields.pageTitle) {
      this.meta.setTitle((routeFields.pageTitle.value as string) || 'Welcome to pharma!');
    }

    if (routeFields && routeFields.pageDescription) {
      this.meta.setTag(
        'description',
        (routeFields.pageDescription.value as string) || 'Page'
      );
    }

    if (routeFields && routeFields.pageKeywords) {
      this.meta.setTag(
        'keywords',
        (routeFields.pageKeywords.value as string) || 'Page'
      );
    }

    if (routeFields && routeFields.structuredMarkupData) {
      this.setJsonLd(routeFields.structuredMarkupData.value as string);
    }

    if (routeFields && routeFields.canonicalUrl) {
      this.setCanonicalUrl(routeFields.canonicalUrl.value as string);
    }
  }

  isProtectedPage(routeFields: { [name: string]: Field }): boolean {
    if (routeFields && routeFields.isProtectedPage && routeFields.isProtectedPage.value && !this.authService.hasValidToken()) {
      this.authService.login();
      return true;
    }
    return false;
  }

  onPlaceholderLoaded(placeholderName: string) {
    // you may optionally hook to the loaded event for a placeholder,
    // which can be useful for analytics and other DOM-based things that need to know when a placeholder's content is available.
    console.log(
      `layout.component.ts: placeholder component fired loaded event for the ${placeholderName} placeholder`
    );
  }

  public setJsonLd(data: any) {
    if (data) {
      let script = this._renderer2.createElement('script');
      script.type = `application/ld+json`;
      script.text = `${data}`;

      this._renderer2.appendChild(this._document.body, script);
    }
  }

  public setCanonicalUrl(data: string) {
    let urls = data.split(/\r?\n/);
    urls.forEach(url => {
      if (!url) {
        url = (typeof window !== "undefined" ? window.location.href : '');
      }
      let script = this._renderer2.createElement('link');
      script.rel = `canonical`;
      script.href = `${url}`;

      this._renderer2.appendChild(this._document.body, script);
    });
  }
}
