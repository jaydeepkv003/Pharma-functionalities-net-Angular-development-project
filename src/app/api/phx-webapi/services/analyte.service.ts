/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { AnalyteViewModel } from '../models/analyte-view-model';

@Injectable({
  providedIn: 'root',
})
export class AnalyteService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation v12AnalyteGet
   */
  static readonly V12AnalyteGetPath = '/v1.2/Analyte';

  /**
   * Get full analyte details (chemical compound data).
   *
   * The names used for testing are found on legacy underneath the application detail page
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `v12AnalyteGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  v12AnalyteGet$Response(params: {
    analyteName: string;

  }): Observable<StrictHttpResponse<AnalyteViewModel>> {

    const rb = new RequestBuilder(this.rootUrl, AnalyteService.V12AnalyteGetPath, 'get');
    if (params) {

      rb.query('analyteName', params.analyteName, {});

    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<AnalyteViewModel>;
      })
    );
  }

  /**
   * Get full analyte details (chemical compound data).
   *
   * The names used for testing are found on legacy underneath the application detail page
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `v12AnalyteGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  v12AnalyteGet(params: {
    analyteName: string;

  }): Observable<AnalyteViewModel> {

    return this.v12AnalyteGet$Response(params).pipe(
      map((r: StrictHttpResponse<AnalyteViewModel>) => r.body as AnalyteViewModel)
    );
  }

  /**
   * Path part for operation v12AnalyteAnalyteDetailsGet
   */
  static readonly V12AnalyteAnalyteDetailsGetPath = '/v1.2/Analyte/AnalyteDetails';

  /**
   * Get full analyte details (chemical compound data).
   *
   * The names used for testing are found on legacy underneath the application detail page
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `v12AnalyteAnalyteDetailsGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  v12AnalyteAnalyteDetailsGet$Response(params: {
    analyteName: string;
    applicationID: number;

  }): Observable<StrictHttpResponse<AnalyteViewModel>> {

    const rb = new RequestBuilder(this.rootUrl, AnalyteService.V12AnalyteAnalyteDetailsGetPath, 'get');
    if (params) {

      rb.query('analyteName', params.analyteName, {});
      rb.query('applicationID', params.applicationID, {});

    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<AnalyteViewModel>;
      })
    );
  }

  /**
   * Get full analyte details (chemical compound data).
   *
   * The names used for testing are found on legacy underneath the application detail page
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `v12AnalyteAnalyteDetailsGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  v12AnalyteAnalyteDetailsGet(params: {
    analyteName: string;
    applicationID: number;

  }): Observable<AnalyteViewModel> {

    return this.v12AnalyteAnalyteDetailsGet$Response(params).pipe(
      map((r: StrictHttpResponse<AnalyteViewModel>) => r.body as AnalyteViewModel)
    );
  }

}
