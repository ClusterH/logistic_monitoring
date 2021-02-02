import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderOptions, NativeGeocoderResult } from '@ionic-native/native-geocoder/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';
import { ParamService } from '../services';
@Component({
  selector: 'app-routeList',
  templateUrl: './routeList.page.html',
  styleUrls: ['./routeList.page.scss'],
})
export class RouteListPage implements OnInit {
  routeList: any[];
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

  constructor(
    private route: Router,
    public menuCtrl: MenuController,
    private geolocation: Geolocation,
    private nativeGeocoder: NativeGeocoder,
    private androidPermissions: AndroidPermissions,
    private locationAccuracy: LocationAccuracy,
    private paramService: ParamService
  ) {
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

  onRouteClick(route): void {
    console.log(route);
    this.paramService.params = { origin: 'Route Origin', dest: 'Route Destination' };
    this.route.navigate(['./check-gps']);
  }

  selectRoute() {
    this.paramService.params = { origin: 'test', lat: 0, lng: 0 };
    this.route.navigate(['./new-route']);
    // this.checkGPSPermission()
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
        console.log("4");
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
        this.getGeolocation()
      },
      error => alert('Error requesting location permissions ' + JSON.stringify(error))
    );
  }


  //Get current coordinates of device
  getGeolocation() {
    this.geolocation.getCurrentPosition().then((resp) => {
      console.log(resp);
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
        console.log(result);
        this.origin = this.generateAddress(result[0]);
        this.paramService.params = { origin: this.origin, lat: this.latOrigin, lng: this.lngOrigin };
        this.route.navigate(['./new-route']);
      })
      .catch((error: any) => {
        alert('Error getting location' + JSON.stringify(error));
      });
  }

  //Return Comma saperated address
  generateAddress(addressObj) {
    console.log(addressObj);
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
    console.log(address);
    return address.slice(0, -2);
  }
}
