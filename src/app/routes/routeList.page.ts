import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-routeList',
  templateUrl: './routeList.page.html',
  styleUrls: ['./routeList.page.scss'],
})
export class RouteListPage implements OnInit {
  routeList: any[];
  selectedRoute: any;

  constructor(private route: Router, public menuCtrl: MenuController) {
    this.menuCtrl.enable(true);
    this.routeList = [
      { id: 1, name: 'ROUTE-01' },
      { id: 2, name: 'ROUTE-02' },
      { id: 3, name: 'ROUTE-03' },
      { id: 4, name: 'ROUTE-04' },
      { id: 5, name: 'ROUTE-05' },
      { id: 6, name: 'ROUTE-06' },
      { id: 7, name: 'ROUTE-07' },
      { id: 8, name: 'ROUTE-08' },
      { id: 9, name: 'ROUTE-09' },
      { id: 10, name: 'ROUTE-10' },
      { id: 11, name: 'ROUTE-11' },
      { id: 12, name: 'ROUTE-12' },
      { id: 13, name: 'ROUTE-13' },
      { id: 14, name: 'ROUTE-14' },
      { id: 15, name: 'ROUTE-15' },
    ];
    this.selectedRoute = this.routeList[0];
  }

  ngOnInit() {
  }

  //  refine() {
  //     this.route.navigate(['./refine']);
  //   }
  //  cart() {
  //     this.route.navigate(['./cart']);
  //   }
  search() {
    this.route.navigate(['./search']);
  }

  onRouteClick(route): void {
    console.log(route);
  }

  selectRoute() {

  }
  // restro_info() {
  //   this.route.navigate(['./restro-info']);
  // }
}
