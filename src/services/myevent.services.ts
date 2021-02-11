import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, Subject } from 'rxjs'; // For rxjs 6

@Injectable({
    providedIn: 'root'
})
export class MyEvent {
    private selectedLanguage = new Subject<string>();
    private userAuth = new BehaviorSubject<UserAuth>(null);
    private userAuth$ = this.userAuth.asObservable();
    private unitId = new BehaviorSubject<number>(null);
    private unitId$ = this.unitId.asObservable();
    private routeId = new BehaviorSubject<number>(null);
    private routeId$ = this.unitId.asObservable();

    constructor() { }

    public getLanguageObservable(): Observable<string> {
        return this.selectedLanguage.asObservable();
    }

    public setLanguageData(data) {
        this.selectedLanguage.next(data);
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