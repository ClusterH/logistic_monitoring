import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { PickerController, IonDatetime, Platform } from "@ionic/angular";
import { PickerOptions } from "@ionic/core";
import { MapsAPILoader, AgmMap } from '@agm/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder, NativeGeocoderOptions, NativeGeocoderResult } from '@ionic-native/native-geocoder/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';

import { ToastService } from '../core/toastController/toast.service';
import { DurationModel } from '../models';
import { ParamService } from '../services';

declare var google;

@Component({
  selector: 'app-new-route',
  templateUrl: './new-route.page.html',
  styleUrls: ['./new-route.page.scss'],
})
export class NewRoutePage implements OnInit {
  latOrigin: number;
  lngOrigin: number;
  accuracy: number;
  latDest: number;
  lngDest: number;
  origin: string;
  destination: string;
  geoencoderOptions: NativeGeocoderOptions = {
    useLocale: true,
    maxResults: 5
  };
  departureDate: string;
  departureTime: string;
  pickerDuration = '2000-01-01T00:00:00.0+03:00';
  displayDuration: string;
  private geoCoder;

  @ViewChild('searchOrigin', { static: false })
  public searchOrigin: ElementRef;
  @ViewChild('searchDest', { static: false })
  public searchDest: ElementRef;
  @ViewChild('durationPicker', { static: false }) durationPicker: IonDatetime;

  constructor(
    private plt: Platform,
    private mapsAPILoader: MapsAPILoader,
    public ngZone: NgZone,
    private route: Router,
    private toastService: ToastService,
    private paramService: ParamService
  ) {
    // this.durationPicker.pickerOptions.columns
    this.plt.ready().then((res) => {
      // this.checkGPSPermission();
    });
  }

  ngOnInit() {
    this.departureDate = new Date().toISOString();
    this.departureTime = new Date().toISOString();
    this.origin = this.paramService.params.origin;
    this.latOrigin = this.paramService.params.lat;
    this.lngOrigin = this.paramService.params.lng;

    this.mapsAPILoader.load().then(() => {
      // this.setCurrentLocation();
      this.geoCoder = new google.maps.Geocoder;
      let autocompleteOrigin = new google.maps.places.Autocomplete(this.searchOrigin.nativeElement, {
        types: ["address"]
      });
      let autocompleteDest = new google.maps.places.Autocomplete(this.searchDest.nativeElement, {
        types: ["address"]
      });

      autocompleteOrigin.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocompleteOrigin.getPlace();
          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
          //set latitude, longitude and zoom
          this.latOrigin = place.geometry.location.lat();
          this.lngOrigin = place.geometry.location.lng();
          this.origin = place.formatted_address;
        });
      });
      autocompleteDest.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocompleteDest.getPlace();
          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
          //set latitude, longitude and zoom
          this.latDest = place.geometry.location.lat();
          this.lngDest = place.geometry.location.lng();
          this.destination = place.formatted_address;
        });
      });
    });
  }

  clear(type: string): void {
    if (type === 'origin') {
      this.origin = '';
    } else {
      this.destination = '';
    }
  }

  openPicker(): void {
    this.durationPicker.open();
  }

  durationChange(event: any): void {
    const date = new Date(event.detail.value);
    this.displayDuration = `${date.getFullYear().toString().slice(-2)}Day ${("00" + date.getHours()).slice(-2)}h ${("00" + date.getMinutes()).slice(-2)}min`;
  }

  startRoute(): void {
    const routeData = {
      origin: this.origin,
      destination: this.destination,
      departureDate: this.departureDate,
      departureTime: this.departureTime,
    }

    for (let item in routeData) {
      if (!routeData[item]) {
        this.toastService.showToast('danger', `Please select ${item}`);
        return;
      }
    }

    this.paramService.params = { origin: this.origin, dest: this.destination }
    this.route.navigate(['./check-gps']);
  }
}

export interface NewRouteSetting {
  origin: string;
  destination: string;
  departureDate: string;
  departureTime: string;
  arrivalDate: string;
  arrivalTime: string;
}