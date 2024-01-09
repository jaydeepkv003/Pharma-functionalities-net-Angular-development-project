import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Subject, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import * as sha256 from 'crypto-js/sha256';
import * as Base64 from 'crypto-js/enc-base64';
import * as hmacSHA256 from 'crypto-js/hmac-sha256';
import { SharedService } from './shared.service';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class AMSService {
  baseUrl: string = environment.AMS.endPoint;
  featureSubject = new Subject<any>();

  constructor(private http: HttpClient,
    private messageService: MessageService,
    private sharedService: SharedService) { }

  signRequest(url): HttpHeaders {
    const utcNow = new Date().toUTCString();
    const contentHash = sha256(undefined).toString(Base64);
    const credential = environment.AMS.id; // Id
    const secret = environment.AMS.secret; // Value
    const baseUrl = new URL(this.baseUrl);

    // SignedHeaders
    const signedHeaders = "x-ms-date;host;x-ms-content-sha256"; // Semicolon separated header names

    // String-To-Sign
    const stringToSign = 'GET' + '\n' + url + '\n' + utcNow + ';' + baseUrl.host + ';' + contentHash;

    // Signature
    const signature = hmacSHA256(stringToSign, Base64.parse(secret)).toString(Base64);

    // Result request headers
    return new HttpHeaders(
      {
        "x-ms-date": utcNow,
        "x-ms-content-sha256": contentHash,
        "Authorization": "HMAC-SHA256 Credential=" + credential + "&SignedHeaders=" + signedHeaders + "&Signature=" + signature
      }
    );
  }

  getFeatureFlags() {

    let url = `/kv?label=${environment.AMS.label}&api-version=1.0`;

    let headers = this.signRequest(url);

    return this.http.get(this.baseUrl + url, { headers: headers })
      .pipe(
        map((x: any) => {
          if (x.items && x.items.length > 0) {
            x.items.forEach(item => {
              const val = JSON.parse(item.value);
              this.sharedService.feature[val.id] = val.enabled;
            });

            this.messageService.sendMessage({ featureAmsLoaded: true });
          }
          this.featureSubject.next(x);
          return x;
        }),
        catchError(this.handleError)
      );
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
}
