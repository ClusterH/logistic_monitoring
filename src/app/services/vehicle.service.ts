import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Constants } from 'src/models/contants.models';
import { MyEvent } from 'src/services/myevent.services';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  userAuth: any;
  constructor(
    private _httpClient: HttpClient,
    private myeventService: MyEvent
  ) {
    this.myeventService.getUserAuth().subscribe(res => {
      this.userAuth = res;
    })
  }

  selectDriver(driverid: number, vehicleid: number): Observable<any> {


    let headers = new HttpHeaders();
    headers = headers.append("Authorization", "Basic " + btoa("trackingxl:4W.f#jB*[pE.j9m"));
    let params = new HttpParams()
      .set('userid', this.userAuth.userID.toString())
      .set('conncode', this.userAuth.conncode.toString())
      .set('token', this.userAuth.token.toString())
      .set('driverid', driverid.toString())
      .set('vehicleid', vehicleid.toString())
      .set('method', 'logindriver');

    return this._httpClient.get(`${Constants.BASE_URL}/trackingxlapi.ashx`, {
      headers: headers,
      params: params
    });
  }

  getDriverVehicles(driverid: number, name?: string): Observable<any> {

    let headers = new HttpHeaders();
    headers = headers.append("Authorization", "Basic " + btoa("trackingxl:4W.f#jB*[pE.j9m"));
    let params = new HttpParams()
      .set('userid', this.userAuth.userID.toString())
      .set('conncode', this.userAuth.conncode.toString())
      .set('token', this.userAuth.token.toString())
      .set('driverid', driverid.toString())
      .set('method', 'getdrivervehicles');

    return this._httpClient.get(`${Constants.BASE_URL}/trackingxlapi.ashx`, {
      headers: headers,
      params: params
    });
  }
}
