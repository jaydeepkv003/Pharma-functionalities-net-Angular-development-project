/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { CreateOrderParams } from '../models/create-order-params';
import { OrderHeaderViewModel } from '../models/order-header-view-model';
import { OrderHeaderViewModelPaginationViewModel } from '../models/order-header-view-model-pagination-view-model';
import { OrderShipmentViewModel } from '../models/order-shipment-view-model';

@Injectable({
  providedIn: 'root',
})
export class OrderService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation v12OrderOrderHeaderIdGet
   */
  static readonly V12OrderOrderHeaderIdGetPath = '/v1.2/Order/{orderHeaderID}';

  /**
   * Retrieves order information. (Auth).
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `v12OrderOrderHeaderIdGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  v12OrderOrderHeaderIdGet$Response(params: {
    orderHeaderID: number;

  }): Observable<StrictHttpResponse<OrderHeaderViewModel>> {

    const rb = new RequestBuilder(this.rootUrl, OrderService.V12OrderOrderHeaderIdGetPath, 'get');
    if (params) {

      rb.path('orderHeaderID', params.orderHeaderID, {});

    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<OrderHeaderViewModel>;
      })
    );
  }

  /**
   * Retrieves order information. (Auth).
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `v12OrderOrderHeaderIdGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  v12OrderOrderHeaderIdGet(params: {
    orderHeaderID: number;

  }): Observable<OrderHeaderViewModel> {

    return this.v12OrderOrderHeaderIdGet$Response(params).pipe(
      map((r: StrictHttpResponse<OrderHeaderViewModel>) => r.body as OrderHeaderViewModel)
    );
  }

  /**
   * Path part for operation v12OrderOrderHeaderIdShipmentsGet
   */
  static readonly V12OrderOrderHeaderIdShipmentsGetPath = '/v1.2/Order/{orderHeaderID}/Shipments';

  /**
   * Returns shipment information for the requested order. (Auth).
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `v12OrderOrderHeaderIdShipmentsGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  v12OrderOrderHeaderIdShipmentsGet$Response(params: {
    orderHeaderID: number;

  }): Observable<StrictHttpResponse<Array<OrderShipmentViewModel>>> {

    const rb = new RequestBuilder(this.rootUrl, OrderService.V12OrderOrderHeaderIdShipmentsGetPath, 'get');
    if (params) {

      rb.path('orderHeaderID', params.orderHeaderID, {});

    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<OrderShipmentViewModel>>;
      })
    );
  }

  /**
   * Returns shipment information for the requested order. (Auth).
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `v12OrderOrderHeaderIdShipmentsGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  v12OrderOrderHeaderIdShipmentsGet(params: {
    orderHeaderID: number;

  }): Observable<Array<OrderShipmentViewModel>> {

    return this.v12OrderOrderHeaderIdShipmentsGet$Response(params).pipe(
      map((r: StrictHttpResponse<Array<OrderShipmentViewModel>>) => r.body as Array<OrderShipmentViewModel>)
    );
  }

  /**
   * Path part for operation v12OrdersGet
   */
  static readonly V12OrdersGetPath = '/v1.2/Orders';

  /**
   * Logged in user's orders (Auth).
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `v12OrdersGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  v12OrdersGet$Response(params?: {
    LastXdays?: null | number;
    Limit?: number;
    Offset?: number;

  }): Observable<StrictHttpResponse<OrderHeaderViewModelPaginationViewModel>> {

    const rb = new RequestBuilder(this.rootUrl, OrderService.V12OrdersGetPath, 'get');
    if (params) {

      rb.query('LastXdays', params.LastXdays, {});
      rb.query('Limit', params.Limit, {});
      rb.query('Offset', params.Offset, {});

    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<OrderHeaderViewModelPaginationViewModel>;
      })
    );
  }

  /**
   * Logged in user's orders (Auth).
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `v12OrdersGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  v12OrdersGet(params?: {
    LastXdays?: null | number;
    Limit?: number;
    Offset?: number;

  }): Observable<OrderHeaderViewModelPaginationViewModel> {

    return this.v12OrdersGet$Response(params).pipe(
      map((r: StrictHttpResponse<OrderHeaderViewModelPaginationViewModel>) => r.body as OrderHeaderViewModelPaginationViewModel)
    );
  }

  /**
   * Path part for operation v12OrderPost
   */
  static readonly V12OrderPostPath = '/v1.2/Order';

  /**
   * Submits the user's cart as a new order. (Auth).
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `v12OrderPost()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  v12OrderPost$Response(params?: {
  
    /**
     * Order information
     */
    body?: CreateOrderParams
  }): Observable<StrictHttpResponse<number>> {

    const rb = new RequestBuilder(this.rootUrl, OrderService.V12OrderPostPath, 'post');
    if (params) {


      rb.body(params.body, 'application/json');
    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return (r as HttpResponse<any>).clone({ body: parseFloat(String((r as HttpResponse<any>).body)) }) as StrictHttpResponse<number>;
      })
    );
  }

  /**
   * Submits the user's cart as a new order. (Auth).
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `v12OrderPost$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  v12OrderPost(params?: {
  
    /**
     * Order information
     */
    body?: CreateOrderParams
  }): Observable<number> {

    return this.v12OrderPost$Response(params).pipe(
      map((r: StrictHttpResponse<number>) => r.body as number)
    );
  }

}
