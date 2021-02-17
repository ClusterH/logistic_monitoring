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

  getCurrentTripWatch(user: any): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.append("Authorization", "Basic " + btoa("trackingxl:4W.f#jB*[pE.j9m"));
    let params = new HttpParams()
      .set('userid', user.userID.toString())
      .set('conncode', user.conncode.toString())
      .set('token', user.token.toString())
      .set('driverid', user.userID.toString())
      .set('method', 'getcurrent_tripwatch')

    return this._httpClient.get(`${Constants.BASE_URL}/trackingxlapi.ashx`, {
      headers: headers,
      params: params
    });
  }
}
