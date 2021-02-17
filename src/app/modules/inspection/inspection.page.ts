import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ParamService } from '../../services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inspection',
  templateUrl: './inspection.page.html',
  styleUrls: ['./inspection.page.scss'],
})
export class InspectionPage implements OnInit {
  isSelectAll: boolean;
  statusList: any;
  isIndeterminate: boolean;

  constructor(
    private _formBuilder: FormBuilder,
    public paramService: ParamService,
    private route: Router,
  ) {
    this.statusList = [
      { value: 'GPS', isChecked: false },
      { value: 'GPRS', isChecked: false },
      { value: 'Ignition', isChecked: false },
      { value: 'Input 1', isChecked: false },
      { value: 'Input 2', isChecked: false },
    ]
  }

  ngOnInit() {
    if (this.paramService.gpsStatus) {
      this.isSelectAll = true;
      this.checkMaster();
    }
  }

  checkMaster() {
    setTimeout(() => {
      this.statusList.forEach(obj => {
        obj.isChecked = this.isSelectAll;
      });
    });
  }

  checkEvent() {
    const totalItems = this.statusList.length;
    let checked = 0;
    this.statusList.map(obj => {
      if (obj.isChecked) checked++;
    });
    if (checked > 0 && checked < totalItems) {
      this.isIndeterminate = true;
      this.isSelectAll = false;
      this.paramService.gpsStatus = false;
    } else if (checked == totalItems) {
      this.isSelectAll = true;
      this.isIndeterminate = false;
      this.paramService.gpsStatus = true;
    } else {
      this.isIndeterminate = false;
      this.isSelectAll = false;
      this.paramService.gpsStatus = false;
    }
  }

  goBack() {
    this.route.navigate(['./check-gps']);
  }
}
