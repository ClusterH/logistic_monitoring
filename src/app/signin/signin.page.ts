import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { AuthenticationService } from '../services';
import { ToastService } from '../core/toastController/toast.service';
import { Subject, Observable, of } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage implements OnInit, OnDestroy {
  private _unsubscribeAll: Subject<any>;
  email: string;
  password: string;

  constructor(
    private route: Router,
    public menuCtrl: MenuController,
    private authService: AuthenticationService,
    private toastService: ToastService
  ) {
    this.menuCtrl.enable(false);
    this._unsubscribeAll = new Subject();
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  logIn() {
    this.authService.logIn(this.email, this.password).pipe(takeUntil(this._unsubscribeAll)).subscribe(res => {
      console.log(res);
      if (res.responseCode === 100 && res.TrackingXLAPI.DATA[0].id > 0) {
        console.log('=====test===');
        localStorage.setItem('current_token', res.token);
        localStorage.setItem('user_auth', JSON.stringify(res.TrackingXLAPI.DATA[0]));
        this.toastService.showToast('success', 'Login Success');
        this.route.navigate(['./vehicle']);
      } else {
        this.toastService.showToast('danger', 'Login Failed. Please check your login info');
      }
    });
  }
  signup() {
    this.route.navigate(['./signup']);
  }
  forgotpassword() {
    this.route.navigate(['./forgot']);
  }

}
