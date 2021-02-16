import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Constants } from 'src/models/contants.models';
import { MyEvent } from 'src/services/myevent.services';
import { NewTripModel } from 'src/app/models'
@Injectable({
  providedIn: 'root'
})
export class RouteService {
  userAuth: any;

  constructor(
    private _httpClient: HttpClient,
    private myeventService: MyEvent
  ) {
    this.myeventService.getUserAuth().subscribe(res => {
      this.userAuth = res;
    })
  }

  getDriverRoutes(driverid: number, name?: string): Observable<any> {

    let headers = new HttpHeaders();
    headers = headers.append("Authorization", "Basic " + btoa("trackingxl:4W.f#jB*[pE.j9m"));
    let params = new HttpParams()
      .set('userid', this.userAuth.userID.toString())
      .set('conncode', this.userAuth.conncode.toString())
      .set('token', this.userAuth.token.toString())
      .set('pagesize', '100000')
      .set('pageindex', '1')
      .set('driverid', driverid.toString())
      .set('method', 'getdriverroutes');

    return this._httpClient.get(`${Constants.BASE_URL}/trackingxlapi.ashx`, {
      headers: headers,
      params: params
    });
  }

  createTripWatch(newTrip: NewTripModel): Observable<any> {

    let headers = new HttpHeaders();
    headers = headers.append("Authorization", "Basic " + btoa("trackingxl:4W.f#jB*[pE.j9m"));
    let params = new HttpParams()
      .append('userid', this.userAuth.userID.toString())
      .append('conncode', this.userAuth.conncode.toString())
      .append('token', this.userAuth.token.toString())
      .append('driverid', this.userAuth.userID.toString())
      .append('method', 'createTripWatch');

    Object.keys(newTrip).map(param => {

      params = params.append(`${param}`, newTrip[param].toString());
    });

    return this._httpClient.get(`${Constants.BASE_URL}/trackingxlapi.ashx`, {
      headers: headers,
      params: params
    });
  }

  routeEvent(method: string, tripId: number): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.append("Authorization", "Basic " + btoa("trackingxl:4W.f#jB*[pE.j9m"));
    let params = new HttpParams()
      .set('userid', this.userAuth.userID.toString())
      .set('conncode', this.userAuth.conncode.toString())
      .set('token', this.userAuth.token.toString())
      .set('driverid', this.userAuth.userID.toString())
      .set('tripid', tripId.toString())
      .set('method', method);

    return this._httpClient.get(`${Constants.BASE_URL}/trackingxlapi.ashx`, {
      headers: headers,
      params: params
    });
  }

  sendPeriodicCode(code: string, tripId: number): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.append("Authorization", "Basic " + btoa("trackingxl:4W.f#jB*[pE.j9m"));
    let params = new HttpParams()
      .set('userid', this.userAuth.userID.toString())
      .set('conncode', this.userAuth.conncode.toString())
      .set('token', this.userAuth.token.toString())
      .set('driverid', this.userAuth.userID.toString())
      .set('tripid', tripId.toString())
      .set('code', code.toString())
      .set('method', 'periodic_code');

    return this._httpClient.get(`${Constants.BASE_URL}/trackingxlapi.ashx`, {
      headers: headers,
      params: params
    });
  }
}
