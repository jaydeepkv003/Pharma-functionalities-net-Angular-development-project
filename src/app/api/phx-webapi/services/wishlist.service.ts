/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { AddApplicationToWishlistRequestParams } from '../models/add-application-to-wishlist-request-params';
import { DocumentRequestParams } from '../models/document-request-params';
import { PartRequestParams } from '../models/part-request-params';
import { WishListDetailViewModel } from '../models/wish-list-detail-view-model';
import { WishListRequestParams } from '../models/wish-list-request-params';
import { WishListViewModel } from '../models/wish-list-view-model';

@Injectable({
  providedIn: 'root',
})
export class WishlistService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation v12WishlistsGet
   */
  static readonly V12WishlistsGetPath = '/v1.2/Wishlists';

  /**
   * Returns all the logged in user's wish lists without their contents. (Auth).
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `v12WishlistsGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  v12WishlistsGet$Response(params?: {

  }): Observable<StrictHttpResponse<Array<WishListViewModel>>> {

    const rb = new RequestBuilder(this.rootUrl, WishlistService.V12WishlistsGetPath, 'get');
    if (params) {


    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<WishListViewModel>>;
      })
    );
  }

  /**
   * Returns all the logged in user's wish lists without their contents. (Auth).
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `v12WishlistsGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  v12WishlistsGet(params?: {

  }): Observable<Array<WishListViewModel>> {

    return this.v12WishlistsGet$Response(params).pipe(
      map((r: StrictHttpResponse<Array<WishListViewModel>>) => r.body as Array<WishListViewModel>)
    );
  }

  /**
   * Path part for operation v12WishlistsWishlistIdGet
   */
  static readonly V12WishlistsWishlistIdGetPath = '/v1.2/Wishlists/{wishlistID}';

  /**
   * Returns all the items inside a user's wish list. (Auth).
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `v12WishlistsWishlistIdGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  v12WishlistsWishlistIdGet$Response(params: {
    wishlistID: number;

  }): Observable<StrictHttpResponse<Array<WishListDetailViewModel>>> {

    const rb = new RequestBuilder(this.rootUrl, WishlistService.V12WishlistsWishlistIdGetPath, 'get');
    if (params) {

      rb.path('wishlistID', params.wishlistID, {});

    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<WishListDetailViewModel>>;
      })
    );
  }

  /**
   * Returns all the items inside a user's wish list. (Auth).
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `v12WishlistsWishlistIdGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  v12WishlistsWishlistIdGet(params: {
    wishlistID: number;

  }): Observable<Array<WishListDetailViewModel>> {

    return this.v12WishlistsWishlistIdGet$Response(params).pipe(
      map((r: StrictHttpResponse<Array<WishListDetailViewModel>>) => r.body as Array<WishListDetailViewModel>)
    );
  }

  /**
   * Path part for operation v12WishlistsWishlistIdDelete
   */
  static readonly V12WishlistsWishlistIdDeletePath = '/v1.2/Wishlists/{wishlistID}';

  /**
   * Deletes a user's wish list with all of its contents. (Auth).
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `v12WishlistsWishlistIdDelete()` instead.
   *
   * This method doesn't expect any request body.
   */
  v12WishlistsWishlistIdDelete$Response(params: {

    /**
     * wishlistID in route for deletion
     */
    wishlistID: number;

  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, WishlistService.V12WishlistsWishlistIdDeletePath, 'delete');
    if (params) {

      rb.path('wishlistID', params.wishlistID, {});

    }
    return this.http.request(rb.build({
      responseType: 'text',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

  /**
   * Deletes a user's wish list with all of its contents. (Auth).
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `v12WishlistsWishlistIdDelete$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  v12WishlistsWishlistIdDelete(params: {

    /**
     * wishlistID in route for deletion
     */
    wishlistID: number;

  }): Observable<void> {

    return this.v12WishlistsWishlistIdDelete$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation v12WishlistPost
   */
  static readonly V12WishlistPostPath = '/v1.2/Wishlist';

  /**
   * Creates an empty wish list. (Auth).
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `v12WishlistPost()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  v12WishlistPost$Response(params?: {
      body?: WishListRequestParams
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, WishlistService.V12WishlistPostPath, 'post');
    if (params) {


      rb.body(params.body, 'application/json');
    }
    return this.http.request(rb.build({
      responseType: 'text',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

  /**
   * Creates an empty wish list. (Auth).
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `v12WishlistPost$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  v12WishlistPost(params?: {
      body?: WishListRequestParams
  }): Observable<void> {

    return this.v12WishlistPost$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation v12WishlistsWishlistIdApplicationPost
   */
  static readonly V12WishlistsWishlistIdApplicationPostPath = '/v1.2/Wishlists/{wishlistID}/Application';

  /**
   * Adds an application to the user's wish list. (Auth).
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `v12WishlistsWishlistIdApplicationPost()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  v12WishlistsWishlistIdApplicationPost$Response(params: {
    wishlistID: number;
      body?: AddApplicationToWishlistRequestParams
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, WishlistService.V12WishlistsWishlistIdApplicationPostPath, 'post');
    if (params) {

      rb.path('wishlistID', params.wishlistID, {});

      rb.body(params.body, 'application/json');
    }
    return this.http.request(rb.build({
      responseType: 'text',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

  /**
   * Adds an application to the user's wish list. (Auth).
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `v12WishlistsWishlistIdApplicationPost$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  v12WishlistsWishlistIdApplicationPost(params: {
    wishlistID: number;
      body?: AddApplicationToWishlistRequestParams
  }): Observable<void> {

    return this.v12WishlistsWishlistIdApplicationPost$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation v12WishlistsWishlistIdDocumentPost
   */
  static readonly V12WishlistsWishlistIdDocumentPostPath = '/v1.2/Wishlists/{wishlistID}/Document';

  /**
   * Adds a document to the user's wish list. (Auth).
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `v12WishlistsWishlistIdDocumentPost()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  v12WishlistsWishlistIdDocumentPost$Response(params: {
    wishlistID: number;
      body?: DocumentRequestParams
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, WishlistService.V12WishlistsWishlistIdDocumentPostPath, 'post');
    if (params) {

      rb.path('wishlistID', params.wishlistID, {});

      rb.body(params.body, 'application/json');
    }
    return this.http.request(rb.build({
      responseType: 'text',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

  /**
   * Adds a document to the user's wish list. (Auth).
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `v12WishlistsWishlistIdDocumentPost$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  v12WishlistsWishlistIdDocumentPost(params: {
    wishlistID: number;
      body?: DocumentRequestParams
  }): Observable<void> {

    return this.v12WishlistsWishlistIdDocumentPost$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation v12WishlistsWishlistIdPartPost
   */
  static readonly V12WishlistsWishlistIdPartPostPath = '/v1.2/Wishlists/{wishlistID}/Part';

  /**
   * Adds a part to the user's wish list. (Auth).
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `v12WishlistsWishlistIdPartPost()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  v12WishlistsWishlistIdPartPost$Response(params: {
    wishlistID: number;
      body?: PartRequestParams
  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, WishlistService.V12WishlistsWishlistIdPartPostPath, 'post');
    if (params) {

      rb.path('wishlistID', params.wishlistID, {});

      rb.body(params.body, 'application/json');
    }
    return this.http.request(rb.build({
      responseType: 'text',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

  /**
   * Adds a part to the user's wish list. (Auth).
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `v12WishlistsWishlistIdPartPost$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  v12WishlistsWishlistIdPartPost(params: {
    wishlistID: number;
      body?: PartRequestParams
  }): Observable<void> {

    return this.v12WishlistsWishlistIdPartPost$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation v12WishlistsItemsWishlistitemIdDelete
   */
  static readonly V12WishlistsItemsWishlistitemIdDeletePath = '/v1.2/Wishlists/Items/{wishlistitemID}';

  /**
   * Deletes an item from the user's wish list. (Auth).
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `v12WishlistsItemsWishlistitemIdDelete()` instead.
   *
   * This method doesn't expect any request body.
   */
  v12WishlistsItemsWishlistitemIdDelete$Response(params: {

    /**
     * wishlistID in route for deletion
     */
    wishlistitemID: number;

  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, WishlistService.V12WishlistsItemsWishlistitemIdDeletePath, 'delete');
    if (params) {

      rb.path('wishlistitemID', params.wishlistitemID, {});

    }
    return this.http.request(rb.build({
      responseType: 'text',
      accept: '*/*'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: undefined }) as StrictHttpResponse<void>;
      })
    );
  }

  /**
   * Deletes an item from the user's wish list. (Auth).
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `v12WishlistsItemsWishlistitemIdDelete$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  v12WishlistsItemsWishlistitemIdDelete(params: {

    /**
     * wishlistID in route for deletion
     */
    wishlistitemID: number;

  }): Observable<void> {

    return this.v12WishlistsItemsWishlistitemIdDelete$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

}
