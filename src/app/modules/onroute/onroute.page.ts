import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, Platform } from '@ionic/angular';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { Subject } from 'rxjs';
import { last, takeUntil } from 'rxjs/operators';
import { ToastService } from '../../core/toastController/toast.service';
import { LoaderService, RouteService, AudioService } from '../../services';
import { MyEvent } from '../../../services/myevent.services';

@Component({
  selector: 'app-onroute',
  templateUrl: './onroute.page.html',
  styleUrls: ['./onroute.page.scss'],
})
export class OnroutePage implements OnInit, OnDestroy {
  routeId: number;
  lastContact = '';
  status: string;
  setInterval: any;
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
    private plt: Platform,
    private toastService: ToastService,
    private loadingService: LoaderService,
    private routeService: RouteService,
    private audioService: AudioService,
    private myEventService: MyEvent,
    public alertController: AlertController,
    private localNotifications: LocalNotifications
  ) {
    this._unsubscribeAll = new Subject();
    this.status = 'On Route';
    this.plt.ready().then(() => {
      this.myEventService.getLastContact().pipe(takeUntil(this._unsubscribeAll)).subscribe(res => {
        if (res) {
          this.lastContact = res;
          if (this.calcDifferenceTime(res)) {
            this.startAlert();
          } else {
          }
        } else {
          this.startAlert();
        }
      });
      this.startNotification();
    });
  }

  ngOnInit() {
    this.myEventService.getRouteId().pipe(takeUntil(this._unsubscribeAll)).subscribe(res => {
      if (res) {
        this.routeId = res;
      } else {
        this.routeId = 3;
      }
    });
  }

  ngAfterViewInit() {
    this.audioService.preload('alert', 'assets/sounds/ring1.mp3');
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  startNotification() {
    this.setInterval = setInterval(() => {
      this.startAlert();
    }, 900000)
  }

  async startAlert() {
    this.audioService.play('alert');

    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirm',
      message: 'Please send your preodic code',
      inputs: [{
        name: 'code',
        type: 'number',
      }],
      buttons: [
        {
          text: 'Send',
          handler: (data) => {
            if (data.code === "") {
              this.toastService.showToast('danger', "please input periodic code");
              return false;
            } else {
              this.sendPromocode(data.code);
            }
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
          }
        },
      ]
    });

    await alert.present();
  }

  sendPromocode(code) {
    this.routeService.sendPeriodicCode(code, this.routeId).pipe(takeUntil(this._unsubscribeAll)).subscribe(res => {
      if (res.responseCode === 100) {
        this.toastService.showToast('success', `Code ${code} was been sent`);
      } else {
        this.toastService.showToast('danger', `Sending code failed`);
      }
    })
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
      clearInterval(this.setInterval);
      this.route.navigate(['./route']);
    } else if (type === 'canceltrip') {
      clearInterval(this.setInterval);
      this.route.navigate(['./route']);
    }
  }

  calcDifferenceTime(lastContact: string): boolean {
    const today = new Date();
    const difference = (new Date().getTime() - new Date(lastContact).getTime());
    return (900000 < difference);
  }
}
