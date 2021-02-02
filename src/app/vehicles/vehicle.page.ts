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
  selectedVehicle: string;

  constructor(private route: Router, public menuCtrl: MenuController) {
    this.menuCtrl.enable(true);
    this.vehicleList = [
      { id: 1, name: 'FS-01', checked: false },
      { id: 2, name: 'FS-02', checked: true },
      { id: 3, name: 'FS-03', checked: false },
      { id: 4, name: 'FS-04', checked: false },
      { id: 5, name: 'FS-05', checked: false },
      { id: 6, name: 'FS-06', checked: false },
      { id: 7, name: 'FS-07', checked: false },
      { id: 8, name: 'FS-08', checked: false },
      { id: 9, name: 'FS-09', checked: false },
      { id: 10, name: 'FS-10', checked: false },
      { id: 11, name: 'FS-11', checked: false },
      { id: 12, name: 'FS-12', checked: false },
      { id: 13, name: 'FS-13', checked: false },
      { id: 14, name: 'FS-14', checked: false },
      { id: 15, name: 'FS-15', checked: false },
    ];
    this.selectedVehicle = '1';
  }

  ngOnInit() {
    console.log(this.selectedVehicle);
  }

  onVehicleClick(vehicle): void {
    this.selectedVehicle = vehicle.id.toString();
    console.log(this.selectedVehicle);

  }

  selectVehicle() {
    if (this.selectedVehicle === null) {
      return;
    }

    this.route.navigate(['./route']);
  }
}
