import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PeriodicReportPage } from './periodic-report.page';

const routes: Routes = [
  {
    path: '',
    component: PeriodicReportPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PeriodicReportPageRoutingModule {}
