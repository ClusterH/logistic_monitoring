import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { AuthenticationService, LoaderService } from '../../services';
import { ToastService } from '../../core/toastController/toast.service';
import { MyEvent } from 'src/services/myevent.services';
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
    private loadingService: LoaderService,
    private toastService: ToastService,
    private myeventService: MyEvent
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
    this.loadingService.showLoader('Please wait until confirm the login!');
    this.authService.logIn(this.email, this.password).pipe(takeUntil(this._unsubscribeAll)).subscribe(res => {
      if (res.responseCode === 100 && res.TrackingXLAPI.DATA[0].id > 0) {
        const user = {
          userID: res.TrackingXLAPI.DATA[0].id,
          conncode: res.TrackingXLAPI.DATA[0].conncode,
          token: res.token
        }
        this.myeventService.setUserAuth(user);
        this.toastService.showToast('success', 'Login Success');

        this.authService.getCurrentTripWatch(user).pipe(takeUntil(this._unsubscribeAll)).subscribe(res => {
          if (res.responseCode === 100 && res.TrackingXLAPI.DATA[0].id > 0) {
            this.myeventService.setRouteId(res.TrackingXLAPI.DATA[0].id);
            this.myeventService.setLastContact(res.TrackingXLAPI.DATA[0].lastcontact);
            this.loadingService.hideLoader();
            this.toastService.showToast('success', 'Moving to Current Tripwatch...!');
            this.route.navigate(['./onroute']);
          } else {
            this.toastService.showToast('success', 'There are no exist Trip, Please create new one!');
            this.loadingService.hideLoader();
            this.route.navigate(['./vehicle']);
          }
        }, error => {
          this.toastService.showToast('success', 'There are no exist Trip, Please create new one!');
          this.loadingService.hideLoader();
          this.route.navigate(['./vehicle']);
        })
      } else {
        this.loadingService.hideLoader();
        this.toastService.showToast('danger', 'Login Failed. Please check your login info');
      }
    }, error => {
      this.loadingService.hideLoader();
      this.toastService.showToast('danger', 'Login Failed. Please check your login info');
    });
  }
  signup() {
    this.route.navigate(['./signup']);
  }
  forgotpassword() {
    this.route.navigate(['./forgot']);
  }

}
