import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CheckGpsPageRoutingModule } from './check-gps-routing.module';

import { CheckGpsPage } from './check-gps.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    CheckGpsPageRoutingModule
  ],
  declarations: [CheckGpsPage]
})
export class CheckGpsPageModule { }
