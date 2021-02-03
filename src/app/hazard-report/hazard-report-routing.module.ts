import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HazardReportPage } from './hazard-report.page';

const routes: Routes = [
  {
    path: '',
    component: HazardReportPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HazardReportPageRoutingModule {}
