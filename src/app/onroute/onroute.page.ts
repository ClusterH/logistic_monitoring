import { Component, OnInit, OnDestroy } from '@angular/core';
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
  private _unsubscribeAll: Subject<any>;

  constructor(
    private toastService: ToastService,
    private loadingService: LoaderService,
    private routeService: RouteService,
    private myEventService: MyEvent,
    public alertController: AlertController
  ) {
    this._unsubscribeAll = new Subject();

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
    this.presentAlertConfirm(type);

  }

  async presentAlertConfirm(type) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Alert',
      message: `<strong>Are you sure to excute <br><span>${type}</span>?</strong>`,
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
      } else {
        this.toastService.showToast('danger', `Please check ${type}, server error occured`);
      }
    })
  }
}
