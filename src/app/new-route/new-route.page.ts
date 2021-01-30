import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { Router } from '@angular/router';

import { MapsAPILoader, AgmMap } from '@agm/core';
import { ToastService } from '../core/toastController/toast.service';

declare var google;

@Component({
  selector: 'app-new-route',
  templateUrl: './new-route.page.html',
  styleUrls: ['./new-route.page.scss'],
})
export class NewRoutePage implements OnInit {
  latOrigin: number;
  lngOrigin: number;
  latDest: number;
  lngDest: number;
  origin: string;
  destination: string;
  departureDate: string;
  departureTime: string;
  duration: string;

  dayPicker: any[];
  hourPicker

  private geoCoder;

  @ViewChild('searchOrigin', { static: false })
  public searchOrigin: ElementRef;
  @ViewChild('searchDest', { static: false })
  public searchDest: ElementRef;

  constructor(
    private mapsAPILoader: MapsAPILoader,
    public ngZone: NgZone,
    private route: Router,
    private toastService: ToastService
  ) {

  }

  ngOnInit() {
    this.departureDate = new Date().toISOString();
    this.departureTime = new Date().toISOString();

    this.mapsAPILoader.load().then(() => {
      this.setCurrentLocation();

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

  // Get Current Location Coordinates
  private setCurrentLocation() {
    if ('geolocation' in navigator) {
      console.log('========')

      navigator.geolocation.getCurrentPosition((position) => {
        console.log(position);
        this.latOrigin = position.coords.latitude;
        this.lngOrigin = position.coords.longitude;
        this.getAddress(this.latOrigin, this.lngOrigin);
      });
    }
  }

  getAddress(latitude, longitude) {
    console.log(latitude, '====', longitude)
    this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {
      console.log(results);
      console.log(status);
      if (status === 'OK') {
        if (results[0]) {
          this.origin = results[0].formatted_address;
          console.log(this.origin);
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }

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

  }

  startRoute(): void {
    console.log(this.origin);
    console.log(this.destination);
    console.log(this.departureDate, this.departureTime);
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
  // latOrigin?: number;
  // lngOrigin?: number;
  // latDest?: number;
  // lngDest?: number;
}
