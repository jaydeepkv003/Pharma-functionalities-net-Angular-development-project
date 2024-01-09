import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { ATTRIBUTE_NAMES } from '../models/constants';

@Injectable({
  providedIn: 'root'
})
export class GlobalSearchService {

  searchString: string;
  facets = {
    "All": ['technique', 'brand', 'phase', 'industry', 'separation_mode', 'type', 'official_method_classification', 'compound_category', 'compound_class', 'pharmacological_effect',
      'particle_size_mim', 'pore_size_a', 'length_mm', 'length_m', 'internal_diameter_mm', 'min_temp', 'max_temp', 'particle_sorbent_type', 'particle_size_range', 'film_thickness_mim', 'composition', 'accessory_type', 'sample_prep_type', 'vial_size', 'vial_closure', 'vial_material', 'vial_certification_level', 'sorbent_mass_volume', 'format'],
    "Applications": ['separation_mode', 'official_method_classification', 'phase', 'technique', 'compound_category', 'compound_class', 'pharmacological_effect', 'industry'],
    "Documents": ['document_type', 'brand', 'phase', 'industry', 'technique', 'separation_mode'],
    "Product Information": ['type'],
    "Part Numbers": ['brand', 'phase', 'technique', 'separation_mode', 'particle_size_mim', 'pore_size_a', 'length_mm', 'length_m', 'internal_diameter_mm', 'official_method_classification', 'min_temp', 'max_temp', 'particle_sorbent_type', 'particle_size_range', 'film_thickness_mim', 'composition', 'accessory_type', 'sample_prep_type', 'vial_size', 'vial_closure', 'vial_material', 'vial_certification_level', 'sorbent_mass_volume', 'format'],
    "Webinars": ['brand', 'phase', 'industry', 'technique']
  };

  header = new HttpHeaders({
    'Authorization': 'Bearer search-' + environment.globalSearch.engine_key
  });

  constructor(private http: HttpClient) { }

  search(data) {
    return this.http.post(environment.globalSearch.baseUrl, data, {
      headers: this.header
    }).pipe(
      catchError(this.handleError)
    );
  }

  searchTopLevel(data) {
    return this.http.post(environment.globalSearch.baseUrl, data, {
      headers: this.header
    }).pipe(
      catchError(this.handleError)
    );
  }

  getFacets(topFilterType: string) {
    return this.facets[topFilterType || 'All'].reduce((acc, curr) => (acc[curr] = [{ "type": "value", size: 250 }], acc), {});
  }

  getKeyByValue(value) {
    return Object.keys(ATTRIBUTE_NAMES).find(key => ATTRIBUTE_NAMES[key] === value);
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };

  putCrawl(url: string, data: any) {
    return this.http.put(url, data).pipe(catchError(this.handleError));
  }
}
