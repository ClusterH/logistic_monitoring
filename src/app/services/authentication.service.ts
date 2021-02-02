import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Constants } from 'src/models/contants.models';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor(private _httpClient: HttpClient) { }

  logIn(email: string, password: string): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.append("Authorization", "Basic " + btoa("trackingxl:4W.f#jB*[pE.j9m"));
    let params = new HttpParams()
      .set('email', email)
      .set('password', password)

    return this._httpClient.get(`${Constants.BASE_URL}/AuthenticateDriver.ashx`, {
      headers: headers,
      params: params
    });
  }
}
