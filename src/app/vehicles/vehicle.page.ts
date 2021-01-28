import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.page.html',
  styleUrls: ['./vehicle.page.scss'],
})
export class VehiclePage implements OnInit {
  vehicleList: any[];
  selectedVehicle: any = null;

  constructor(private route: Router, public menuCtrl: MenuController) {
    this.menuCtrl.enable(true);
    this.vehicleList = [
      { id: 1, name: 'FS-01' },
      { id: 2, name: 'FS-02' },
      { id: 3, name: 'FS-03' },
      { id: 4, name: 'FS-04' },
      { id: 5, name: 'FS-05' },
      { id: 6, name: 'FS-06' },
      { id: 7, name: 'FS-07' },
      { id: 8, name: 'FS-08' },
      { id: 9, name: 'FS-09' },
      { id: 10, name: 'FS-10' },
      { id: 11, name: 'FS-11' },
      { id: 12, name: 'FS-12' },
      { id: 13, name: 'FS-13' },
      { id: 14, name: 'FS-14' },
      { id: 15, name: 'FS-15' },
    ];
    this.selectedVehicle = this.vehicleList[0];
  }

  ngOnInit() {
    console.log(this.selectedVehicle);
  }

  //  refine() {
  //     this.route.navigate(['./refine']);
  //   }
  //  cart() {
  //     this.route.navigate(['./cart']);
  //   }
  search() {
    this.route.navigate(['./search']);
  }

  onVehicleClick(vehicle): void {
    console.log(vehicle);
  }

  selectVehicle() {
    if (this.selectedVehicle === null) {
      return;
    }

    this.route.navigate(['./route']);
  }
  // restro_info() {
  //   this.route.navigate(['./restro-info']);
  // }
}
