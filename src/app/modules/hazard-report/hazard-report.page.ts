import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { ToastService } from '../../core/toastController/toast.service';
import { LoaderService, ReportService } from '../../services';
import { MyEvent } from '../../../services/myevent.services';

@Component({
  selector: 'app-hazard-report',
  templateUrl: './hazard-report.page.html',
  styleUrls: ['./hazard-report.page.scss'],
})
export class HazardReportPage implements OnInit {
  noteContent: string = '';
  private _unsubscribeAll: Subject<any>;

  constructor(
    private route: Router,
    private toastService: ToastService,
    private loadingService: LoaderService,
    private reportService: ReportService,
    private myEventService: MyEvent
  ) {
    this._unsubscribeAll = new Subject();
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  reportIncident(): void {
    this.myEventService.getUserAuth().pipe(takeUntil(this._unsubscribeAll)).subscribe(res => {
      const driverId = res.userID;
      this.reportService.tripWatchContactSave(this.noteContent, driverId).pipe(takeUntil(this._unsubscribeAll)).subscribe(res => {
        if (res.responseCode === 100) {
          this.toastService.showToast('success', 'Report Success!');
          this.route.navigate(['./onroute']);
        } else {
          this.toastService.showToast('danger', 'Report Failed!');
        }
      })
    })
  }
}
