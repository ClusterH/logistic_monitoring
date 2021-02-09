import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PeriodicReportPageRoutingModule } from './periodic-report-routing.module';

import { PeriodicReportPage } from './periodic-report.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PeriodicReportPageRoutingModule
  ],
  declarations: [PeriodicReportPage]
})
export class PeriodicReportPageModule {}
