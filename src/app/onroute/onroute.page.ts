import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Subject, Observable, of } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ToastService } from '../core/toastController/toast.service';
import { LoaderService, RouteService } from '../services';
import { MyEvent } from '../../services/myevent.services';

@Component({
  selector: 'app-onroute',
  templateUrl: './onroute.page.html',
  styleUrls: ['./onroute.page.scss'],
})
export class OnroutePage implements OnInit, OnDestroy {
  routeId: number;
  status: string;
  eventButtonActiveList = {
    start: false,
    finish: true,
    startStop: true,
    endStop: false,
    cancelRoute: true,
    reportIncident: true
  }
  private _unsubscribeAll: Subject<any>;

  constructor(
    private route: Router,
    private toastService: ToastService,
    private loadingService: LoaderService,
    private routeService: RouteService,
    private myEventService: MyEvent,
    public alertController: AlertController
  ) {
    this._unsubscribeAll = new Subject();
    this.status = 'On Route';
  }

  ngOnInit() {
    this.myEventService.getRouteId().pipe(takeUntil(this._unsubscribeAll)).subscribe(res => {
      this.routeId = res;
    })
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  routeEvent(type) {
    if (type === 'reportIncident') {
      this.route.navigate(['./hazard-report']);
    } else {
      this.presentAlertConfirm(type);
    }
  }

  async presentAlertConfirm(type) {
    let message: string;
    switch (type) {
      case 'starttrip':
        message = 'Are you sure you want to Start the trip?';
        break
      case 'finishtrip':
        message = 'Are you sure you want to Finish the trip?';
        break
      case 'canceltrip':
        message = 'Are you sure you want to Cancel the trip?';
        break
      case 'starttripstop':
        message = 'Are you starting an stop?';
        break
      case 'finishtripstop':
        message = 'Are you finishing the stop?';
        break
    }

    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirm',
      message: message,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Okay',
          handler: () => {
            this.excuteRouteEvent(type);
          }
        }
      ]
    });

    await alert.present();
  }

  excuteRouteEvent(type): void {
    this.routeService.routeEvent(type, this.routeId).pipe(takeUntil(this._unsubscribeAll)).subscribe(res => {
      console.log(res);
      if (res.responseCode === 100) {
        this.toastService.showToast('success', `Success ${type}`);
        this.changeEventButtonActiveList(type);
      } else {
        this.toastService.showToast('danger', `Please check ${type}, server error occured`);
      }
    })
  }

  changeEventButtonActiveList(type): void {
    if (type === 'starttrip') {
      this.eventButtonActiveList = {
        start: false,
        finish: true,
        startStop: true,
        endStop: false,
        cancelRoute: true,
        reportIncident: true
      };
      this.status = 'On Route';
    } else if (type === 'starttripstop') {
      this.eventButtonActiveList = {
        start: false,
        finish: true,
        startStop: false,
        endStop: true,
        cancelRoute: true,
        reportIncident: true
      };
      this.status = 'Stopped';
    } else if (type === 'finishtripstop') {
      this.eventButtonActiveList = {
        start: false,
        finish: true,
        startStop: true,
        endStop: false,
        cancelRoute: true,
        reportIncident: true
      };
      this.status = 'On Route';
    } else if (type === 'finishtrip') {
      this.route.navigate(['./route']);
    } else if (type === 'canceltrip') {
      this.route.navigate(['./route']);
    }
  }
}
