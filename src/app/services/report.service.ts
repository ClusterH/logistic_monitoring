import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Constants } from 'src/models/contants.models';
import { MyEvent } from 'src/services/myevent.services';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  userAuth: any;

  constructor(
    private _httpClient: HttpClient,
    private myeventService: MyEvent
  ) {
    this.myeventService.getUserAuth().subscribe(res => {
      this.userAuth = res;
    })
  }

  tripWatchContactSave(notes: string, driverId: number): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.append("Authorization", "Basic " + btoa("trackingxl:4W.f#jB*[pE.j9m"));
    let params = new HttpParams()
      .set('userid', this.userAuth.userID.toString())
      .set('conncode', this.userAuth.conncode.toString())
      .set('token', this.userAuth.token.toString())
      .set('id', '0')
      .set('operatorid', driverId.toString())
      .set('notes', notes)
      .set('actiontype', '2')
      .set('actionsubtype', '0')
      .set('method', 'tripwatchcontact_save')

    return this._httpClient.get(`${Constants.BASE_URL}/trackingxlapi.ashx`, {
      headers: headers,
      params: params
    });
  }
}
