import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  baseURL = 'http://trackingxlapi.polarix.com/AuthenticateDriver.ashx';

  constructor(private _httpClient: HttpClient) { }

  logIn(email: string, password: string): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.append("Authorization", "Basic " + btoa("trackingxl:4W.f#jB*[pE.j9m"));
    let params = new HttpParams()
      .set('email', email)
      .set('password', password)

    return this._httpClient.get(this.baseURL, {
      headers: headers,
      params: params
    });
  }
}
