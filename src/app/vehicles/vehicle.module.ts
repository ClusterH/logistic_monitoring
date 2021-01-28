import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { IonicModule } from '@ionic/angular';

import { VehiclePageRoutingModule } from './vehicle-routing.module';

import { VehiclePage } from './vehicle.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    VehiclePageRoutingModule
  ],
  declarations: [VehiclePage]
})
export class VehiclePageModule { }
