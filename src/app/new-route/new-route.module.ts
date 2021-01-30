import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewRoutePageRoutingModule } from './new-route-routing.module';

import { NewRoutePage } from './new-route.page';
import { AgmCoreModule } from '@agm/core';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewRoutePageRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDO1lOoJtxmSRni0mkXGGrqmcn3TqLP8t4',
      libraries: ['places']
    })
  ],
  declarations: [NewRoutePage]
})
export class NewRoutePageModule { }
