import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OnroutePage } from './onroute.page';

const routes: Routes = [
  {
    path: '',
    component: OnroutePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OnroutePageRoutingModule {}
