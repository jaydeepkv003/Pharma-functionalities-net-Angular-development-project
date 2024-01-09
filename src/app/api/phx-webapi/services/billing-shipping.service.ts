/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';
import { RequestBuilder } from '../request-builder';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

import { BillToViewModel } from '../models/bill-to-view-model';
import { CountryViewModel } from '../models/country-view-model';
import { DeliveryTimeViewModel } from '../models/delivery-time-view-model';

@Injectable({
  providedIn: 'root',
})
export class BillingShippingService extends BaseService {
  constructor(
    config: ApiConfiguration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * Path part for operation v12BillingShippingAddressesGet
   */
  static readonly V12BillingShippingAddressesGetPath = '/v1.2/BillingShipping/Addresses';

  /**
   * Gets BillTo with ShipTo Addresses for logged in User (Auth).
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `v12BillingShippingAddressesGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  v12BillingShippingAddressesGet$Response(params?: {

  }): Observable<StrictHttpResponse<Array<BillToViewModel>>> {

    const rb = new RequestBuilder(this.rootUrl, BillingShippingService.V12BillingShippingAddressesGetPath, 'get');
    if (params) {


    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<BillToViewModel>>;
      })
    );
  }

  /**
   * Gets BillTo with ShipTo Addresses for logged in User (Auth).
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `v12BillingShippingAddressesGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  v12BillingShippingAddressesGet(params?: {

  }): Observable<Array<BillToViewModel>> {

    return this.v12BillingShippingAddressesGet$Response(params).pipe(
      map((r: StrictHttpResponse<Array<BillToViewModel>>) => r.body as Array<BillToViewModel>)
    );
  }

  /**
   * Path part for operation v12BillingShippingBillToBillToIdSetDefaultPut
   */
  static readonly V12BillingShippingBillToBillToIdSetDefaultPutPath = '/v1.2/BillingShipping/BillTo/{billToID}/SetDefault';

  /**
   * Set Default BillTo for logged in user (Auth).
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `v12BillingShippingBillToBillToIdSetDefaultPut()` instead.
   *
   * This method doesn't expect any request body.
   */
  v12BillingShippingBillToBillToIdSetDefaultPut$Response(params: {
    billToID: number;

  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, BillingShippingService.V12BillingShippingBillToBillToIdSetDefaultPutPath, 'put');
    if (params) {

      rb.path('billToID', params.billToID, {});

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
   * Set Default BillTo for logged in user (Auth).
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `v12BillingShippingBillToBillToIdSetDefaultPut$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  v12BillingShippingBillToBillToIdSetDefaultPut(params: {
    billToID: number;

  }): Observable<void> {

    return this.v12BillingShippingBillToBillToIdSetDefaultPut$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation v12BillingShippingShipToShipToIdSetDefaultPut
   */
  static readonly V12BillingShippingShipToShipToIdSetDefaultPutPath = '/v1.2/BillingShipping/ShipTo/{shipToID}/SetDefault';

  /**
   * Sets default billing address for logged in user (Auth).
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `v12BillingShippingShipToShipToIdSetDefaultPut()` instead.
   *
   * This method doesn't expect any request body.
   */
  v12BillingShippingShipToShipToIdSetDefaultPut$Response(params: {
    shipToID: number;

  }): Observable<StrictHttpResponse<void>> {

    const rb = new RequestBuilder(this.rootUrl, BillingShippingService.V12BillingShippingShipToShipToIdSetDefaultPutPath, 'put');
    if (params) {

      rb.path('shipToID', params.shipToID, {});

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
   * Sets default billing address for logged in user (Auth).
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `v12BillingShippingShipToShipToIdSetDefaultPut$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  v12BillingShippingShipToShipToIdSetDefaultPut(params: {
    shipToID: number;

  }): Observable<void> {

    return this.v12BillingShippingShipToShipToIdSetDefaultPut$Response(params).pipe(
      map((r: StrictHttpResponse<void>) => r.body as void)
    );
  }

  /**
   * Path part for operation v12BillingShippingCountriesGet
   */
  static readonly V12BillingShippingCountriesGetPath = '/v1.2/BillingShipping/Countries';

  /**
   * Returns ecommerce enabled countries for the logged-in user. (Auth).
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `v12BillingShippingCountriesGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  v12BillingShippingCountriesGet$Response(params?: {

  }): Observable<StrictHttpResponse<Array<CountryViewModel>>> {

    const rb = new RequestBuilder(this.rootUrl, BillingShippingService.V12BillingShippingCountriesGetPath, 'get');
    if (params) {


    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<CountryViewModel>>;
      })
    );
  }

  /**
   * Returns ecommerce enabled countries for the logged-in user. (Auth).
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `v12BillingShippingCountriesGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  v12BillingShippingCountriesGet(params?: {

  }): Observable<Array<CountryViewModel>> {

    return this.v12BillingShippingCountriesGet$Response(params).pipe(
      map((r: StrictHttpResponse<Array<CountryViewModel>>) => r.body as Array<CountryViewModel>)
    );
  }

  /**
   * Path part for operation v12BillingShippingDeliveryTimesGet
   */
  static readonly V12BillingShippingDeliveryTimesGetPath = '/v1.2/BillingShipping/DeliveryTimes';

  /**
   * Returns a list of available delivery times by country. (Auth).
   *
   *
   *
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `v12BillingShippingDeliveryTimesGet()` instead.
   *
   * This method doesn't expect any request body.
   */
  v12BillingShippingDeliveryTimesGet$Response(params: {
    countryID: number;

  }): Observable<StrictHttpResponse<Array<DeliveryTimeViewModel>>> {

    const rb = new RequestBuilder(this.rootUrl, BillingShippingService.V12BillingShippingDeliveryTimesGetPath, 'get');
    if (params) {

      rb.query('countryID', params.countryID, {});

    }
    return this.http.request(rb.build({
      responseType: 'json',
      accept: 'application/json'
    })).pipe(
      filter((r: any) => r instanceof HttpResponse),
      map((r: HttpResponse<any>) => {
        return r as StrictHttpResponse<Array<DeliveryTimeViewModel>>;
      })
    );
  }

  /**
   * Returns a list of available delivery times by country. (Auth).
   *
   *
   *
   * This method provides access to only to the response body.
   * To access the full response (for headers, for example), `v12BillingShippingDeliveryTimesGet$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  v12BillingShippingDeliveryTimesGet(params: {
    countryID: number;

  }): Observable<Array<DeliveryTimeViewModel>> {

    return this.v12BillingShippingDeliveryTimesGet$Response(params).pipe(
      map((r: StrictHttpResponse<Array<DeliveryTimeViewModel>>) => r.body as Array<DeliveryTimeViewModel>)
    );
  }

}
