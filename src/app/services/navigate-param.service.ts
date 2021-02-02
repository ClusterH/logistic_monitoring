import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ParamService {
  params: any;
  // public gpsStatus = new BehaviorSubject<boolean>(false)
  //   public gpsStatus$ = this.gpsStatus.asObservable();
  public gpsStatus = false;
}
