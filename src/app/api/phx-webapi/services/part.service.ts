/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { PartViewModel } from '../models/part-view-model';

@Injectable({
  providedIn: 'root',
})
export class PartService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation v12PartsGet
   */
  static readonly V12PartsGetPath = '/v1.2/Parts';

  /**
   * Returns a list of parts by either IDs or numbers, including all metadata.
   *
   * - Either IDs, numbers, or both must be supplied.
   * - IDs must be positive integers.
   * - Only available for purchase (active) parts are returned.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `v12PartsGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  v12PartsGet$Response(params?: {

    /**
     * Part Numbers
     */
    numbers?: null | Array<string>;

    /**
     * Part IDs
     */
    ids?: null | Array<number>;

  }): Observable<StrictHttpResponse<Array<PartViewModel>>> {

    const rb = new RequestBuilder(this.rootUrl, PartService.V12PartsGetPath, 'get');
    if (params) {

      rb.query('numbers', params.numbers, {});
      rb.query('ids', params.ids, {});

    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<PartViewModel>>;
      })
    );
  }

  /**
   * Returns a list of parts by either IDs or numbers, including all metadata.
   *
   * - Either IDs, numbers, or both must be supplied.
   * - IDs must be positive integers.
   * - Only available for purchase (active) parts are returned.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `v12PartsGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  v12PartsGet(params?: {

    /**
     * Part Numbers
     */
    numbers?: null | Array<string>;

    /**
     * Part IDs
     */
    ids?: null | Array<number>;

  }): Observable<Array<PartViewModel>> {

    return this.v12PartsGet$Response(params).pipe(
      map((r: StrictHttpResponse<Array<PartViewModel>>) => r.body as Array<PartViewModel>)
    );
  }

}
