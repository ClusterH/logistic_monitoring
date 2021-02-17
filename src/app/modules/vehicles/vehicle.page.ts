import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { Subject, Observable, of } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { VehicleService } from '../../services';
import { MyEvent } from 'src/services/myevent.services';

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.page.html',
  styleUrls: ['./vehicle.page.scss'],
})
export class VehiclePage implements OnInit, OnDestroy {
  driverId: number;
  vehicleList: VehicleModel[];
  vehicleList$: Observable<VehicleModel[]>;
  selectedVehicle: string = '';
  private _unsubscribeAll: Subject<any>;

  constructor(
    private route: Router,
    public menuCtrl: MenuController,
    private vehicleService: VehicleService,
    private myeventService: MyEvent
  ) {
    this.menuCtrl.enable(true);
    this._unsubscribeAll = new Subject();

  }

  ngOnInit() {
    this.myeventService.getUserAuth().subscribe(res => {
      this.driverId = res.userID;
      this.vehicleService.getDriverVehicles(this.driverId).pipe(takeUntil(this._unsubscribeAll)).subscribe(res => {
        this.vehicleList = [...res.TrackingXLAPI.DATA];
        this.vehicleList$ = of(this.vehicleList);
        this.selectedVehicle = this.vehicleList[0].id.toString();
      })
    });
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  filter(e: any): void {

    this.vehicleList$ = of(this.vehicleList.filter(item => item.name.toLowerCase().includes(e.detail.value.toLowerCase())));
  }

  onVehicleClick(vehicle): void {
    this.selectedVehicle = vehicle.id.toString();
    this.vehicleService.selectDriver(this.driverId, vehicle.id).pipe(takeUntil(this._unsubscribeAll)).subscribe(res => {

    });
  }

  selectVehicle() {
    if (this.selectedVehicle === null) {
      return;
    }
    this.myeventService.setUnitId(+this.selectedVehicle);
    this.route.navigate(['./route']);
  }
}

export interface VehicleModel {
  id: number,
  name: string
}
