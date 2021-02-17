import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderOptions, NativeGeocoderResult } from '@ionic-native/native-geocoder/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';
import { ParamService, LoaderService, RouteService } from '../../services';
import { MyEvent } from 'src/services/myevent.services';
import { Subject, Observable, of } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Route } from '@angular/compiler/src/core';

@Component({
  selector: 'app-routeList',
  templateUrl: './routeList.page.html',
  styleUrls: ['./routeList.page.scss'],
})
export class RouteListPage implements OnInit {
  driverId: number;
  routeList: any[];
  routeList$: Observable<any[]>;
  selectedRoute: any;

  latOrigin: number;
  lngOrigin: number;
  accuracy: number;
  origin: string;
  geoencoderOptions: NativeGeocoderOptions = {
    useLocale: true,
    maxResults: 5
  };

  gpsflg = false;

  private _unsubscribeAll: Subject<any>;

  constructor(
    private route: Router,
    public menuCtrl: MenuController,
    private geolocation: Geolocation,
    private nativeGeocoder: NativeGeocoder,
    private androidPermissions: AndroidPermissions,
    private locationAccuracy: LocationAccuracy,
    private paramService: ParamService,
    private loadingService: LoaderService,
    private routeService: RouteService,
    private myeventService: MyEvent
  ) {
    this.menuCtrl.enable(true);
    this._unsubscribeAll = new Subject();
  }

  ngOnInit() {
    this.myeventService.getUserAuth().subscribe(res => {
      this.driverId = res.userID;
      this.routeService.getDriverRoutes(this.driverId).pipe(takeUntil(this._unsubscribeAll)).subscribe(res => {
        this.routeList = [...res.TrackingXLAPI.DATA];
        this.routeList$ = of(this.routeList);
      })
    });
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  filter(e: any): void {
    this.routeList$ = of(this.routeList.filter(item => item.name.toLowerCase().includes(e.detail.value.toLowerCase())));
  }

  onRouteClick(route): void {
    this.paramService.params = { origin: route.origen, dest: route.destination, routeId: route.id };
    this.route.navigate(['./check-gps']);
  }

  selectRoute() {
    // this.paramService.params = { origin: 'test', lat: 0, lng: 0 };
    // this.route.navigate(['./new-route']);

    this.checkGPSPermission();
  }

  checkGPSPermission() {
    this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION).then(
      result => {
        if (result.hasPermission) {
          //If having permission show 'Turn On GPS' dialogue
          this.askToTurnOnGPS();
        } else {
          //If not having permission ask for permission
          this.requestGPSPermission();
        }
      },
      err => {
        alert(err);
      }
    );
  }

  requestGPSPermission() {
    this.locationAccuracy.canRequest().then((canRequest: boolean) => {
      if (canRequest) {
      } else {
        //Show 'GPS Permission Request' dialogue
        this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION)
          .then(
            () => {
              // call method to turn on GPS
              this.askToTurnOnGPS();
            },
            error => {
              //Show alert if user click on 'No Thanks'
              alert('requestPermission Error requesting location permissions ' + error)
            }
          );
      }
    });
  }

  askToTurnOnGPS() {
    this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(
      () => {
        // When GPS Turned ON call method to get Accurate location coordinates
        this.gpsflg = true;
        this.loadingService.showLoader('Please wait...');
        this.getGeolocation();
      },
      error => alert('Error requesting location permissions ' + JSON.stringify(error))
    );
  }


  //Get current coordinates of device
  getGeolocation() {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.latOrigin = resp.coords.latitude;
      this.lngOrigin = resp.coords.longitude;
      this.accuracy = resp.coords.accuracy;

      this.getGeoencoder(resp.coords.latitude, resp.coords.longitude);

    }).catch((error) => {
      alert('Error getting location' + JSON.stringify(error));
    });
  }

  //geocoder method to fetch address from coordinates passed as arguments
  getGeoencoder(latitude, longitude) {
    this.nativeGeocoder.reverseGeocode(latitude, longitude, this.geoencoderOptions)
      .then((result: NativeGeocoderResult[]) => {

        this.origin = this.generateAddress(result[0]);
        this.paramService.params = { origin: this.origin, lat: this.latOrigin, lng: this.lngOrigin };
        this.loadingService.hideLoader();
        setTimeout(() => {
          this.route.navigate(['./new-route']);
        }, 500)
      })
      .catch((error: any) => {
        this.loadingService.hideLoader();
        alert('Error getting location' + JSON.stringify(error));
      });
  }

  //Return Comma saperated address
  generateAddress(addressObj) {

    let obj = [];
    let address = "";
    for (let key in addressObj) {
      obj.push(addressObj[key]);
    }
    obj.reverse();
    for (let val in obj) {
      if (obj[val].length)
        address += obj[val] + ', ';
    }

    return address.slice(0, -2);
  }
}
