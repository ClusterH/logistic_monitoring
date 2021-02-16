import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { OnroutePageRoutingModule } from './onroute-routing.module';
import { OnroutePage } from './onroute.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OnroutePageRoutingModule
  ],
  declarations: [OnroutePage],
})
export class OnroutePageModule { }
