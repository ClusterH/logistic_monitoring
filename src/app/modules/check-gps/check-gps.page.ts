import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ParamService } from '../../services';

@Component({
  selector: 'app-check-gps',
  templateUrl: './check-gps.page.html',
  styleUrls: ['./check-gps.page.scss'],
})
export class CheckGpsPage implements OnInit {
  origin: string;
  destination: string;
  routeId: any;
  constructor(
    private route: Router,
    public paramService: ParamService
  ) { }

  ngOnInit() {
    this.origin = this.paramService.params.origin;
    this.destination = this.paramService.params.dest;
    this.routeId = this.paramService.params.routeId;
    // this.origin = 'This is the Origin';
    // this.destination = 'This is the Destination';
  }

  inspection(): void {
    this.route.navigate(['./inspection']);
  }

  onClick() {
    this.route.navigate(['./onroute']);

  }

}
