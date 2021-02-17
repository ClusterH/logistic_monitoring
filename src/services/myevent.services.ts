import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, Subject } from 'rxjs'; // For rxjs 6

@Injectable({
  providedIn: 'root'
})
export class MyEvent {
  private userAuth = new BehaviorSubject<UserAuth>(null);
  private userAuth$ = this.userAuth.asObservable();
  private lastContact = new BehaviorSubject<string>(null);
  private lastContact$ = this.lastContact.asObservable();
  private unitId = new BehaviorSubject<number>(null);
  private unitId$ = this.unitId.asObservable();
  private routeId = new BehaviorSubject<number>(null);
  private routeId$ = this.unitId.asObservable();

  constructor() { }

  public getLastContact(): Observable<string> {
    return this.lastContact$;
  }

  public setLastContact(data) {
    this.lastContact.next(data);
  }

  public getUserAuth(): Observable<any> {
    return this.userAuth$;
  }

  public setUserAuth(user) {
    this.userAuth.next(user);
  }
  public getUnitId(): Observable<any> {
    return this.unitId$;
  }

  public setUnitId(id: number) {
    this.unitId.next(id);
  }

  public getRouteId(): Observable<any> {
    return this.routeId$;
  }

  public setRouteId(id: number) {
    this.routeId.next(id);
  }
}

export interface UserAuth {
  userID: number,
  conncode: string,
  token: string
}
