/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { ApplicationSimpleViewModelPaginationViewModel } from '../models/application-simple-view-model-pagination-view-model';
import { ApplicationViewModel } from '../models/application-view-model';
import { ApplicationsSummaryViewModel } from '../models/applications-summary-view-model';
import { CompoundSearchViewModel } from '../models/compound-search-view-model';
import { LegacySearchFilterViewModel } from '../models/legacy-search-filter-view-model';
import { SimilarApplicationsViewModelPaginationViewModel } from '../models/similar-applications-view-model-pagination-view-model';
import { StructureSearchModel } from '../models/structure-search-model';

@Injectable({
  providedIn: 'root',
})
export class ApplicationService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation v12ApplicationApplicationIdGet
   */
  static readonly V12ApplicationApplicationIdGetPath = '/v1.2/Application/{applicationId}';

  /**
   * Get an LC or GC application by applicationId.
   *
   * LC and GC have slightly different properties <br /> 
   * If something is null it is because it is not returned from legacy or app manager
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `v12ApplicationApplicationIdGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  v12ApplicationApplicationIdGet$Response(params: {
    applicationId: number;

  }): Observable<StrictHttpResponse<ApplicationViewModel>> {

    const rb = new RequestBuilder(this.rootUrl, ApplicationService.V12ApplicationApplicationIdGetPath, 'get');
    if (params) {

      rb.path('applicationId', params.applicationId, {});

    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<ApplicationViewModel>;
      })
    );
  }

  /**
   * Get an LC or GC application by applicationId.
   *
   * LC and GC have slightly different properties <br /> 
   * If something is null it is because it is not returned from legacy or app manager
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `v12ApplicationApplicationIdGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  v12ApplicationApplicationIdGet(params: {
    applicationId: number;

  }): Observable<ApplicationViewModel> {

    return this.v12ApplicationApplicationIdGet$Response(params).pipe(
      map((r: StrictHttpResponse<ApplicationViewModel>) => r.body as ApplicationViewModel)
    );
  }

  /**
   * Path part for operation v12ApplicationSearchFiltersGet
   */
  static readonly V12ApplicationSearchFiltersGetPath = '/v1.2/Application/SearchFilters';

  /**
   * Get all the legacy search filters but sorted the same as on the legacy UI.
   *
   * Same functionality as legacy     <br />
   * Works with /Applications <br />
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `v12ApplicationSearchFiltersGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  v12ApplicationSearchFiltersGet$Response(params?: {
    CompoundClass?: null | string;
    Industry?: null | string;
    Technique?: null | string;
    SeparationMode?: null | string;
    ColumnPhase?: null | string;
    CompoundCategory?: null | string;
    Method?: null | string;
    SearchText?: null | string;
    PharmacologicalEffect?: null | string;

  }): Observable<StrictHttpResponse<LegacySearchFilterViewModel>> {

    const rb = new RequestBuilder(this.rootUrl, ApplicationService.V12ApplicationSearchFiltersGetPath, 'get');
    if (params) {

      rb.query('CompoundClass', params.CompoundClass, {});
      rb.query('Industry', params.Industry, {});
      rb.query('Technique', params.Technique, {});
      rb.query('SeparationMode', params.SeparationMode, {});
      rb.query('ColumnPhase', params.ColumnPhase, {});
      rb.query('CompoundCategory', params.CompoundCategory, {});
      rb.query('Method', params.Method, {});
      rb.query('SearchText', params.SearchText, {});
      rb.query('PharmacologicalEffect', params.PharmacologicalEffect, {});

    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<LegacySearchFilterViewModel>;
      })
    );
  }

  /**
   * Get all the legacy search filters but sorted the same as on the legacy UI.
   *
   * Same functionality as legacy     <br />
   * Works with /Applications <br />
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `v12ApplicationSearchFiltersGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  v12ApplicationSearchFiltersGet(params?: {
    CompoundClass?: null | string;
    Industry?: null | string;
    Technique?: null | string;
    SeparationMode?: null | string;
    ColumnPhase?: null | string;
    CompoundCategory?: null | string;
    Method?: null | string;
    SearchText?: null | string;
    PharmacologicalEffect?: null | string;

  }): Observable<LegacySearchFilterViewModel> {

    return this.v12ApplicationSearchFiltersGet$Response(params).pipe(
      map((r: StrictHttpResponse<LegacySearchFilterViewModel>) => r.body as LegacySearchFilterViewModel)
    );
  }

  /**
   * Path part for operation v12ApplicationsGet
   */
  static readonly V12ApplicationsGetPath = '/v1.2/Applications';

  /**
   * Get all applications either with or without.
   *
   * Accepts SearchFilters and returns a simple view of an application     <br />
   * Works with response from /SearchFilter <br />
   * Only tested the filter values briefly if you find bugs in the search text let us know here <br />
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `v12ApplicationsGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  v12ApplicationsGet$Response(params?: {
    CompoundClass?: null | string;
    Industry?: null | string;
    Technique?: null | string;
    SeparationMode?: null | string;
    ColumnPhase?: null | string;
    CompoundCategory?: null | string;
    Method?: null | string;
    PharmacologicalEffect?: null | string;
    SearchText?: null | string;
    Limit?: number;
    Offset?: number;

  }): Observable<StrictHttpResponse<ApplicationSimpleViewModelPaginationViewModel>> {

    const rb = new RequestBuilder(this.rootUrl, ApplicationService.V12ApplicationsGetPath, 'get');
    if (params) {

      rb.query('CompoundClass', params.CompoundClass, {});
      rb.query('Industry', params.Industry, {});
      rb.query('Technique', params.Technique, {});
      rb.query('SeparationMode', params.SeparationMode, {});
      rb.query('ColumnPhase', params.ColumnPhase, {});
      rb.query('CompoundCategory', params.CompoundCategory, {});
      rb.query('Method', params.Method, {});
      rb.query('PharmacologicalEffect', params.PharmacologicalEffect, {});
      rb.query('SearchText', params.SearchText, {});
      rb.query('Limit', params.Limit, {});
      rb.query('Offset', params.Offset, {});

    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<ApplicationSimpleViewModelPaginationViewModel>;
      })
    );
  }

  /**
   * Get all applications either with or without.
   *
   * Accepts SearchFilters and returns a simple view of an application     <br />
   * Works with response from /SearchFilter <br />
   * Only tested the filter values briefly if you find bugs in the search text let us know here <br />
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `v12ApplicationsGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  v12ApplicationsGet(params?: {
    CompoundClass?: null | string;
    Industry?: null | string;
    Technique?: null | string;
    SeparationMode?: null | string;
    ColumnPhase?: null | string;
    CompoundCategory?: null | string;
    Method?: null | string;
    PharmacologicalEffect?: null | string;
    SearchText?: null | string;
    Limit?: number;
    Offset?: number;

  }): Observable<ApplicationSimpleViewModelPaginationViewModel> {

    return this.v12ApplicationsGet$Response(params).pipe(
      map((r: StrictHttpResponse<ApplicationSimpleViewModelPaginationViewModel>) => r.body as ApplicationSimpleViewModelPaginationViewModel)
    );
  }

  /**
   * Path part for operation v12ApplicationsSummaryGet
   */
  static readonly V12ApplicationsSummaryGetPath = '/v1.2/Applications/Summary';

  /**
   * Returns limited application information for a list of applications.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `v12ApplicationsSummaryGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  v12ApplicationsSummaryGet$Response(params: {
    appIDs: Array<number>;

  }): Observable<StrictHttpResponse<ApplicationsSummaryViewModel>> {

    const rb = new RequestBuilder(this.rootUrl, ApplicationService.V12ApplicationsSummaryGetPath, 'get');
    if (params) {

      rb.query('appIDs', params.appIDs, {});

    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<ApplicationsSummaryViewModel>;
      })
    );
  }

  /**
   * Returns limited application information for a list of applications.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `v12ApplicationsSummaryGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  v12ApplicationsSummaryGet(params: {
    appIDs: Array<number>;

  }): Observable<ApplicationsSummaryViewModel> {

    return this.v12ApplicationsSummaryGet$Response(params).pipe(
      map((r: StrictHttpResponse<ApplicationsSummaryViewModel>) => r.body as ApplicationsSummaryViewModel)
    );
  }

  /**
   * Path part for operation v12ApplicationApplicationIdSimilarGet
   */
  static readonly V12ApplicationApplicationIdSimilarGetPath = '/v1.2/Application/{applicationID}/Similar';

  /**
   * Returns similar/related applications by industry and analyte.
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `v12ApplicationApplicationIdSimilarGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  v12ApplicationApplicationIdSimilarGet$Response(params: {
    applicationID: number;
    analyteName: string;
    searchText?: null | string;
    Limit?: number;
    Offset?: number;

  }): Observable<StrictHttpResponse<SimilarApplicationsViewModelPaginationViewModel>> {

    const rb = new RequestBuilder(this.rootUrl, ApplicationService.V12ApplicationApplicationIdSimilarGetPath, 'get');
    if (params) {

      rb.path('applicationID', params.applicationID, {});
      rb.query('analyteName', params.analyteName, {});
      rb.query('searchText', params.searchText, {});
      rb.query('Limit', params.Limit, {});
      rb.query('Offset', params.Offset, {});

    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<SimilarApplicationsViewModelPaginationViewModel>;
      })
    );
  }

  /**
   * Returns similar/related applications by industry and analyte.
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `v12ApplicationApplicationIdSimilarGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  v12ApplicationApplicationIdSimilarGet(params: {
    applicationID: number;
    analyteName: string;
    searchText?: null | string;
    Limit?: number;
    Offset?: number;

  }): Observable<SimilarApplicationsViewModelPaginationViewModel> {

    return this.v12ApplicationApplicationIdSimilarGet$Response(params).pipe(
      map((r: StrictHttpResponse<SimilarApplicationsViewModelPaginationViewModel>) => r.body as SimilarApplicationsViewModelPaginationViewModel)
    );
  }

  /**
   * Path part for operation v12ApplicationsCompoundAliasListGet
   */
  static readonly V12ApplicationsCompoundAliasListGetPath = '/v1.2/Applications/CompoundAliasList';

  /**
   * Get the Compound Alias List By Name.
   *
   * Request of the title and returns the Compound Alias List
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `v12ApplicationsCompoundAliasListGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  v12ApplicationsCompoundAliasListGet$Response(params: {
    compoundName: string;
    searchAll?: boolean;

  }): Observable<StrictHttpResponse<Array<string>>> {

    const rb = new RequestBuilder(this.rootUrl, ApplicationService.V12ApplicationsCompoundAliasListGetPath, 'get');
    if (params) {

      rb.query('compoundName', params.compoundName, {});
      rb.query('searchAll', params.searchAll, {});

    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<string>>;
      })
    );
  }

  /**
   * Get the Compound Alias List By Name.
   *
   * Request of the title and returns the Compound Alias List
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `v12ApplicationsCompoundAliasListGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  v12ApplicationsCompoundAliasListGet(params: {
    compoundName: string;
    searchAll?: boolean;

  }): Observable<Array<string>> {

    return this.v12ApplicationsCompoundAliasListGet$Response(params).pipe(
      map((r: StrictHttpResponse<Array<string>>) => r.body as Array<string>)
    );
  }

  /**
   * Path part for operation v12ApplicationsCompoundSearchFiltersGet
   */
  static readonly V12ApplicationsCompoundSearchFiltersGetPath = '/v1.2/Applications/CompoundSearchFilters';

  /**
   * Get the compound details and application list With search fiters.
   *
   * Request of the filters and returns the compound details and application list with search filter lists<br />
   * Works with response from /SearchFilter <br />
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `v12ApplicationsCompoundSearchFiltersGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  v12ApplicationsCompoundSearchFiltersGet$Response(params?: {
    CompoundName?: null | string;
    Technique?: null | string;
    SeparationMode?: null | string;
    ColumnPhase?: null | string;
    Limit?: number;
    Offset?: number;

  }): Observable<StrictHttpResponse<CompoundSearchViewModel>> {

    const rb = new RequestBuilder(this.rootUrl, ApplicationService.V12ApplicationsCompoundSearchFiltersGetPath, 'get');
    if (params) {

      rb.query('CompoundName', params.CompoundName, {});
      rb.query('Technique', params.Technique, {});
      rb.query('SeparationMode', params.SeparationMode, {});
      rb.query('ColumnPhase', params.ColumnPhase, {});
      rb.query('Limit', params.Limit, {});
      rb.query('Offset', params.Offset, {});

    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<CompoundSearchViewModel>;
      })
    );
  }

  /**
   * Get the compound details and application list With search fiters.
   *
   * Request of the filters and returns the compound details and application list with search filter lists<br />
   * Works with response from /SearchFilter <br />
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `v12ApplicationsCompoundSearchFiltersGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  v12ApplicationsCompoundSearchFiltersGet(params?: {
    CompoundName?: null | string;
    Technique?: null | string;
    SeparationMode?: null | string;
    ColumnPhase?: null | string;
    Limit?: number;
    Offset?: number;

  }): Observable<CompoundSearchViewModel> {

    return this.v12ApplicationsCompoundSearchFiltersGet$Response(params).pipe(
      map((r: StrictHttpResponse<CompoundSearchViewModel>) => r.body as CompoundSearchViewModel)
    );
  }

  /**
   * Path part for operation v12ApplicationsApplicationStructureSearchGet
   */
  static readonly V12ApplicationsApplicationStructureSearchGetPath = '/v1.2/Applications/ApplicationStructureSearch';

  /**
   * Get the List of application along with search filter data.
   *
   * Request of the filters and returns the Compound Match List with Search Filter List<br />
   * Works with response from /SearchFilter <br />
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `v12ApplicationsApplicationStructureSearchGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  v12ApplicationsApplicationStructureSearchGet$Response(params?: {
    Id?: null | string;
    Technique?: null | string;
    SeparationMode?: null | string;
    ColumnPhase?: null | string;
    MatchType?: null | string;
    Limit?: number;
    Offset?: number;

  }): Observable<StrictHttpResponse<StructureSearchModel>> {

    const rb = new RequestBuilder(this.rootUrl, ApplicationService.V12ApplicationsApplicationStructureSearchGetPath, 'get');
    if (params) {

      rb.query('Id', params.Id, {});
      rb.query('Technique', params.Technique, {});
      rb.query('SeparationMode', params.SeparationMode, {});
      rb.query('ColumnPhase', params.ColumnPhase, {});
      rb.query('MatchType', params.MatchType, {});
      rb.query('Limit', params.Limit, {});
      rb.query('Offset', params.Offset, {});

    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<StructureSearchModel>;
      })
    );
  }

  /**
   * Get the List of application along with search filter data.
   *
   * Request of the filters and returns the Compound Match List with Search Filter List<br />
   * Works with response from /SearchFilter <br />
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `v12ApplicationsApplicationStructureSearchGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  v12ApplicationsApplicationStructureSearchGet(params?: {
    Id?: null | string;
    Technique?: null | string;
    SeparationMode?: null | string;
    ColumnPhase?: null | string;
    MatchType?: null | string;
    Limit?: number;
    Offset?: number;

  }): Observable<StructureSearchModel> {

    return this.v12ApplicationsApplicationStructureSearchGet$Response(params).pipe(
      map((r: StrictHttpResponse<StructureSearchModel>) => r.body as StructureSearchModel)
    );
  }

}
