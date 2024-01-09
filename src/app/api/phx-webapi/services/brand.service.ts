/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { AttributeFiltersPartsPhasesViewModel } from '../models/attribute-filters-parts-phases-view-model';
import { SeparationModePhaseViewModel } from '../models/separation-mode-phase-view-model';

@Injectable({
  providedIn: 'root',
})
export class BrandService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation v12BrandBrandIdPhasesGet
   */
  static readonly V12BrandBrandIdPhasesGetPath = '/v1.2/Brand/{brandID}/Phases';

  /**
   * Get SeparationMode and Phases for from a particular brand.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `v12BrandBrandIdPhasesGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  v12BrandBrandIdPhasesGet$Response(params: {
    brandID: number;

  }): Observable<StrictHttpResponse<Array<SeparationModePhaseViewModel>>> {

    const rb = new RequestBuilder(this.rootUrl, BrandService.V12BrandBrandIdPhasesGetPath, 'get');
    if (params) {

      rb.path('brandID', params.brandID, {});

    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<SeparationModePhaseViewModel>>;
      })
    );
  }

  /**
   * Get SeparationMode and Phases for from a particular brand.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `v12BrandBrandIdPhasesGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  v12BrandBrandIdPhasesGet(params: {
    brandID: number;

  }): Observable<Array<SeparationModePhaseViewModel>> {

    return this.v12BrandBrandIdPhasesGet$Response(params).pipe(
      map((r: StrictHttpResponse<Array<SeparationModePhaseViewModel>>) => r.body as Array<SeparationModePhaseViewModel>)
    );
  }

  /**
   * Path part for operation v12BrandPhasePhaseIdGet
   */
  static readonly V12BrandPhasePhaseIdGetPath = '/v1.2/Brand/Phase/{phaseID}';

  /**
   * Get filter options with Phase Detail Information and Part Info.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `v12BrandPhasePhaseIdGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  v12BrandPhasePhaseIdGet$Response(params: {
    phaseID: number;

  }): Observable<StrictHttpResponse<AttributeFiltersPartsPhasesViewModel>> {

    const rb = new RequestBuilder(this.rootUrl, BrandService.V12BrandPhasePhaseIdGetPath, 'get');
    if (params) {

      rb.path('phaseID', params.phaseID, {});

    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<AttributeFiltersPartsPhasesViewModel>;
      })
    );
  }

  /**
   * Get filter options with Phase Detail Information and Part Info.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `v12BrandPhasePhaseIdGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  v12BrandPhasePhaseIdGet(params: {
    phaseID: number;

  }): Observable<AttributeFiltersPartsPhasesViewModel> {

    return this.v12BrandPhasePhaseIdGet$Response(params).pipe(
      map((r: StrictHttpResponse<AttributeFiltersPartsPhasesViewModel>) => r.body as AttributeFiltersPartsPhasesViewModel)
    );
  }

}
