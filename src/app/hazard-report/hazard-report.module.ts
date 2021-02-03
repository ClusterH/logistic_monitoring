import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HazardReportPageRoutingModule } from './hazard-report-routing.module';

import { HazardReportPage } from './hazard-report.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HazardReportPageRoutingModule
  ],
  declarations: [HazardReportPage]
})
export class HazardReportPageModule {}
