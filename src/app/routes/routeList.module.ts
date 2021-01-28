import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';
import { RouteListRoutingModule } from './routeList-routing.module';
import { RouteListPage } from './routeList.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    RouteListRoutingModule
  ],
  declarations: [RouteListPage]
})
export class RouteListPageModule { }
