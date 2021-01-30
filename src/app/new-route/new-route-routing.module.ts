import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewRoutePage } from './new-route.page';

const routes: Routes = [
  {
    path: '',
    component: NewRoutePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewRoutePageRoutingModule {}
