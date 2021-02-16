import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { InspectionPageRoutingModule } from './inspection-routing.module';
import { InspectionPage } from './inspection.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    InspectionPageRoutingModule
  ],
  declarations: [InspectionPage]
})
export class InspectionPageModule { }
