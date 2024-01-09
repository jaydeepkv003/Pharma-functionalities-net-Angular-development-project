/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { AddPartByIdParams } from '../models/add-part-by-id-params';
import { AddQuoteToCartByIdParams } from '../models/add-quote-to-cart-by-id-params';
import { AddQuoteToCartByNumberParams } from '../models/add-quote-to-cart-by-number-params';
import { CartPreviewViewModel } from '../models/cart-preview-view-model';
import { CartViewModel } from '../models/cart-view-model';
import { SetQuantityParams } from '../models/set-quantity-params';

@Injectable({
  providedIn: 'root',
})
export class CartService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation v12CartGet
   */
  static readonly V12CartGetPath = '/v1.2/Cart';

  /**
   * Returns the user's cart details and promotional pricing. (Auth).
   *
   * - The cart must be in the "Open" state.
   * - Only the most recent cart is returned.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `v12CartGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  v12CartGet$Response(params?: {

  }): Observable<StrictHttpResponse<CartViewModel>> {

    const rb = new RequestBuilder(this.rootUrl, CartService.V12CartGetPath, 'get');
    if (params) {


    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<CartViewModel>;
      })
    );
  }

  /**
   * Returns the user's cart details and promotional pricing. (Auth).
   *
   * - The cart must be in the "Open" state.
   * - Only the most recent cart is returned.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `v12CartGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  v12CartGet(params?: {

  }): Observable<CartViewModel> {

    return this.v12CartGet$Response(params).pipe(
      map((r: StrictHttpResponse<CartViewModel>) => r.body as CartViewModel)
    );
  }

  /**
   * Path part for operation v12CartDelete
   */
  static readonly V12CartDeletePath = '/v1.2/Cart';

  /**
   * Removes (clears) all cart details from the cart. (Auth).
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `v12CartDelete()` instead.
   *
   * This method doesn't expect any request body.
   */
  v12CartDelete$Response(params?: {

  }): Observable<StrictHttpResponse<CartViewModel>> {

    const rb = new RequestBuilder(this.rootUrl, CartService.V12CartDeletePath, 'delete');
    if (params) {


    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<CartViewModel>;
      })
    );
  }

  /**
   * Removes (clears) all cart details from the cart. (Auth).
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `v12CartDelete$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  v12CartDelete(params?: {

  }): Observable<CartViewModel> {

    return this.v12CartDelete$Response(params).pipe(
      map((r: StrictHttpResponse<CartViewModel>) => r.body as CartViewModel)
    );
  }

  /**
   * Path part for operation v12CartCartPreviewGet
   */
  static readonly V12CartCartPreviewGetPath = '/v1.2/Cart/CartPreview';

  /**
   * Returns the user's cart preview with promotion pricing. (Auth).
   *
   * - For Cart icon preview.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `v12CartCartPreviewGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  v12CartCartPreviewGet$Response(params: {

    /**
     * Cart ID for cart preview
     */
    cartID: number;

  }): Observable<StrictHttpResponse<CartPreviewViewModel>> {

    const rb = new RequestBuilder(this.rootUrl, CartService.V12CartCartPreviewGetPath, 'get');
    if (params) {

      rb.query('cartID', params.cartID, {});

    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<CartPreviewViewModel>;
      })
    );
  }

  /**
   * Returns the user's cart preview with promotion pricing. (Auth).
   *
   * - For Cart icon preview.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `v12CartCartPreviewGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  v12CartCartPreviewGet(params: {

    /**
     * Cart ID for cart preview
     */
    cartID: number;

  }): Observable<CartPreviewViewModel> {

    return this.v12CartCartPreviewGet$Response(params).pipe(
      map((r: StrictHttpResponse<CartPreviewViewModel>) => r.body as CartPreviewViewModel)
    );
  }

  /**
   * Path part for operation v12CartDetailsByPartIdPost
   */
  static readonly V12CartDetailsByPartIdPostPath = '/v1.2/Cart/Details/ByPartID';

  /**
   * Adds parts to cart by part ID. (Auth).
   *
   * - Both part IDs and part numbers are supported.
   * - Quantities of parts already present in the cart are summed.
   * - Nothing is added to the cart if any part in the supplied list cannot be found.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `v12CartDetailsByPartIdPost()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  v12CartDetailsByPartIdPost$Response(params?: {
  
    /**
     * List of part IDs and their quantities to add
     */
    body?: null | Array<AddPartByIdParams>
  }): Observable<StrictHttpResponse<CartViewModel>> {

    const rb = new RequestBuilder(this.rootUrl, CartService.V12CartDetailsByPartIdPostPath, 'post');
    if (params) {


      rb.body(params.body, 'application/json');
    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<CartViewModel>;
      })
    );
  }

  /**
   * Adds parts to cart by part ID. (Auth).
   *
   * - Both part IDs and part numbers are supported.
   * - Quantities of parts already present in the cart are summed.
   * - Nothing is added to the cart if any part in the supplied list cannot be found.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `v12CartDetailsByPartIdPost$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  v12CartDetailsByPartIdPost(params?: {
  
    /**
     * List of part IDs and their quantities to add
     */
    body?: null | Array<AddPartByIdParams>
  }): Observable<CartViewModel> {

    return this.v12CartDetailsByPartIdPost$Response(params).pipe(
      map((r: StrictHttpResponse<CartViewModel>) => r.body as CartViewModel)
    );
  }

  /**
   * Path part for operation v12CartDetailByQuoteIdPost
   */
  static readonly V12CartDetailByQuoteIdPostPath = '/v1.2/Cart/Detail/ByQuoteID';

  /**
   * Adds a quote to cart by quote ID. (Auth).
   *
   * - The quote must exist.
   * - The quote must be active.
   * - The quote must belong to the user's account.
   * - Each operation results in a new cart detail record.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `v12CartDetailByQuoteIdPost()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  v12CartDetailByQuoteIdPost$Response(params?: {
  
    /**
     * Quote ID to add
     */
    body?: AddQuoteToCartByIdParams
  }): Observable<StrictHttpResponse<CartViewModel>> {

    const rb = new RequestBuilder(this.rootUrl, CartService.V12CartDetailByQuoteIdPostPath, 'post');
    if (params) {


      rb.body(params.body, 'application/json');
    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<CartViewModel>;
      })
    );
  }

  /**
   * Adds a quote to cart by quote ID. (Auth).
   *
   * - The quote must exist.
   * - The quote must be active.
   * - The quote must belong to the user's account.
   * - Each operation results in a new cart detail record.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `v12CartDetailByQuoteIdPost$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  v12CartDetailByQuoteIdPost(params?: {
  
    /**
     * Quote ID to add
     */
    body?: AddQuoteToCartByIdParams
  }): Observable<CartViewModel> {

    return this.v12CartDetailByQuoteIdPost$Response(params).pipe(
      map((r: StrictHttpResponse<CartViewModel>) => r.body as CartViewModel)
    );
  }

  /**
   * Path part for operation v12CartDetailByQuoteNumberPost
   */
  static readonly V12CartDetailByQuoteNumberPostPath = '/v1.2/Cart/Detail/ByQuoteNumber';

  /**
   * Adds a quote to cart by quote number. (Auth).
   *
   * - The quote must exist.
   * - The quote must be active.
   * - The quote must belong to the user's account.
   * - Each operation results in a new cart detail record.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `v12CartDetailByQuoteNumberPost()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  v12CartDetailByQuoteNumberPost$Response(params?: {
  
    /**
     * Quote number to add
     */
    body?: AddQuoteToCartByNumberParams
  }): Observable<StrictHttpResponse<CartViewModel>> {

    const rb = new RequestBuilder(this.rootUrl, CartService.V12CartDetailByQuoteNumberPostPath, 'post');
    if (params) {


      rb.body(params.body, 'application/json');
    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<CartViewModel>;
      })
    );
  }

  /**
   * Adds a quote to cart by quote number. (Auth).
   *
   * - The quote must exist.
   * - The quote must be active.
   * - The quote must belong to the user's account.
   * - Each operation results in a new cart detail record.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `v12CartDetailByQuoteNumberPost$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  v12CartDetailByQuoteNumberPost(params?: {
  
    /**
     * Quote number to add
     */
    body?: AddQuoteToCartByNumberParams
  }): Observable<CartViewModel> {

    return this.v12CartDetailByQuoteNumberPost$Response(params).pipe(
      map((r: StrictHttpResponse<CartViewModel>) => r.body as CartViewModel)
    );
  }

  /**
   * Path part for operation v12CartDetailCartDetailIdPut
   */
  static readonly V12CartDetailCartDetailIdPutPath = '/v1.2/Cart/Detail/{cartDetailId}';

  /**
   * Updates the quantity of a cart detail. (Auth).
   *
   * - Quantity must be a positive integer.
   * - Cannot be used to remove cart details.
   * - Cannot be used to update quote quantities.
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `v12CartDetailCartDetailIdPut()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  v12CartDetailCartDetailIdPut$Response(params: {

    /**
     * Cart detail ID to update
     */
    cartDetailId: number;
  
    /**
     * New cart detail quantity
     */
    body?: SetQuantityParams
  }): Observable<StrictHttpResponse<CartViewModel>> {

    const rb = new RequestBuilder(this.rootUrl, CartService.V12CartDetailCartDetailIdPutPath, 'put');
    if (params) {

      rb.path('cartDetailId', params.cartDetailId, {});

      rb.body(params.body, 'application/json');
    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<CartViewModel>;
      })
    );
  }

  /**
   * Updates the quantity of a cart detail. (Auth).
   *
   * - Quantity must be a positive integer.
   * - Cannot be used to remove cart details.
   * - Cannot be used to update quote quantities.
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `v12CartDetailCartDetailIdPut$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  v12CartDetailCartDetailIdPut(params: {

    /**
     * Cart detail ID to update
     */
    cartDetailId: number;
  
    /**
     * New cart detail quantity
     */
    body?: SetQuantityParams
  }): Observable<CartViewModel> {

    return this.v12CartDetailCartDetailIdPut$Response(params).pipe(
      map((r: StrictHttpResponse<CartViewModel>) => r.body as CartViewModel)
    );
  }

  /**
   * Path part for operation v12CartDetailCartDetailIdDelete
   */
  static readonly V12CartDetailCartDetailIdDeletePath = '/v1.2/Cart/Detail/{cartDetailId}';

  /**
   * Removes a cart detail from the cart. (Auth).
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `v12CartDetailCartDetailIdDelete()` instead.
   *
   * This method doesn't expect any request body.
   */
  v12CartDetailCartDetailIdDelete$Response(params: {

    /**
     * Cart detail ID to remove
     */
    cartDetailId: number;

  }): Observable<StrictHttpResponse<CartViewModel>> {

    const rb = new RequestBuilder(this.rootUrl, CartService.V12CartDetailCartDetailIdDeletePath, 'delete');
    if (params) {

      rb.path('cartDetailId', params.cartDetailId, {});

    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<CartViewModel>;
      })
    );
  }

  /**
   * Removes a cart detail from the cart. (Auth).
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `v12CartDetailCartDetailIdDelete$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  v12CartDetailCartDetailIdDelete(params: {

    /**
     * Cart detail ID to remove
     */
    cartDetailId: number;

  }): Observable<CartViewModel> {

    return this.v12CartDetailCartDetailIdDelete$Response(params).pipe(
      map((r: StrictHttpResponse<CartViewModel>) => r.body as CartViewModel)
    );
  }

}
