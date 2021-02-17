import { MapsAPILoader } from '@agm/core';
import { Component, ElementRef, NgZone, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NativeGeocoderOptions } from '@ionic-native/native-geocoder/ngx';
import { IonDatetime, Platform } from "@ionic/angular";
import { Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { MyEvent } from '../../../services/myevent.services';
import { ToastService } from '../../core/toastController/toast.service';
import { NewTripModel } from '../../models';
import { LoaderService, ParamService, RouteService } from '../../services';

@Component({
  selector: 'app-new-route',
  templateUrl: './new-route.page.html',
  styleUrls: ['./new-route.page.scss'],
})
export class NewRoutePage implements OnInit, OnDestroy {
  newTrip: NewTripModel = {};
  // latOrigin: number;
  // lngOrigin: number;
  // accuracy: number;
  // latDest: number;
  // lngDest: number;
  // origin: string;
  // destination: string;
  geoencoderOptions: NativeGeocoderOptions = {
    useLocale: true,
    maxResults: 5
  };
  departureDate: string;
  departureTime: string;
  pickerDuration = '2000-01-05T00:00:00';
  displayDuration: string = '00Day 00h 00min';
  private geoCoder;

  private _unsubscribeAll: Subject<any>;

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
    private paramService: ParamService,
    private loadingService: LoaderService,
    private routeService: RouteService,
    private myEventService: MyEvent
  ) {
    this._unsubscribeAll = new Subject();
  }

  ngOnInit() {
    this.departureDate = new Date().toISOString();
    this.departureTime = new Date().toISOString();
    this.newTrip.origen = this.paramService.params.origin;
    this.newTrip.fromlatitude = this.paramService.params.lat;
    this.newTrip.fromlongitude = this.paramService.params.lng;

    // this.newTrip.origen = this.paramService.params.origin;
    // this.newTrip.fromlatitude = this.paramService.params.lat;
    // this.newTrip.fromlongitude = this.paramService.params.lng;
    // this.newTrip.origen = 'Test Origin';
    // this.newTrip.fromlatitude = 0;
    // this.newTrip.fromlongitude = 0;

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
          this.newTrip.fromlatitude = place.geometry.location.lat();
          this.newTrip.fromlongitude = place.geometry.location.lng();
          this.newTrip.origen = place.formatted_address;
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
          this.newTrip.tolatitude = place.geometry.location.lat();
          this.newTrip.tolongitude = place.geometry.location.lng();
          this.newTrip.destination = place.formatted_address;
        });
      });
    });
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  clear(type: string): void {
    if (type === 'origin') {
      this.newTrip.origen = '';
    } else {
      this.newTrip.destination = '';
    }
  }

  calcDuration(): void {
    if (this.newTrip.origen === '' || this.newTrip.destination === '' || this.newTrip.destination === undefined) {
      this.toastService.showToast('danger', `Please Check Origin and Destination`);
      return;
    }
    const directionsService = new google.maps.DirectionsService;

    let distance = 0;
    let duration = 0;
    // this.loadingService.showLoader('Please wait...!');

    // setTimeout(() => {
    directionsService.route({
      origin: { lat: this.newTrip.fromlatitude, lng: this.newTrip.fromlongitude },
      destination: { lat: this.newTrip.tolatitude, lng: this.newTrip.tolongitude },
      waypoints: [],
      optimizeWaypoints: true,
      travelMode: google.maps.TravelMode.DRIVING
    }, (response, status) => {
      this.ngZone.run(() => {

        if (status == 'OK') {
          distance = response.routes[0].legs[0].distance.value;
          duration = response.routes[0].legs[0].duration.value;
          this.pickerDuration = this.calcDurationBystring(duration);
        } else {
          this.loadingService.hideLoader();
          alert('Distance request failed due to ' + status);
        }
      });
    });
  }

  calcDurationBystring(duration: number): string {

    this.newTrip.eta = Math.floor(duration / 60);
    const day = Math.floor(duration / 86400);
    const hours = Math.floor((duration - day * 86400) / 3600);
    const min = Math.floor((duration - day * 86400 - hours * 3600) / 60);
    const durationString = `20${("00" + day).slice(-2)}-01-05T${("00" + hours).slice(-2)}:${("00" + min).slice(-2)}:00`;
    const date = new Date(durationString);
    this.newTrip.eta = date.getMinutes();
    this.displayDuration = `${date.getFullYear().toString().slice(-2)}Day ${("00" + date.getHours()).slice(-2)}h ${("00" + date.getMinutes()).slice(-2)}min`;

    this.loadingService.hideLoader();
    return durationString;
  }

  openPicker(): void {
    this.durationPicker.open();
  }

  durationChange(event: any): void {

    const date = new Date(event.detail.value);
    this.newTrip.eta = date.getMinutes();

    this.displayDuration = `${date.getFullYear().toString().slice(-2)}Day ${("00" + date.getHours()).slice(-2)}h ${("00" + date.getMinutes()).slice(-2)}min`;
  }

  startRoute(): void {
    this.loadingService.showLoader('Please wait...');

    const routeData = {
      origin: this.newTrip.origen,
      destination: this.newTrip.destination,
      departureDate: this.departureDate,
      departureTime: this.departureTime,
    }

    for (let item in routeData) {
      if (!routeData[item]) {
        this.loadingService.hideLoader();
        this.toastService.showToast('danger', `Please select ${item}`);
        return;
      }
    }

    this.myEventService.getUnitId().pipe(take(1), takeUntil(this._unsubscribeAll)).subscribe(res => {
      this.newTrip.unitid = res;
      this.routeService.createTripWatch(this.newTrip).pipe(takeUntil(this._unsubscribeAll)).subscribe(res => {
        this.loadingService.hideLoader();
        this.myEventService.setRouteId(res.TrackingXLAPI.DATA[0].id);
        this.paramService.params = { origin: this.newTrip.origen, dest: this.newTrip.destination, routeId: res.TrackingXLAPI.DATA[0].id };
        this.route.navigate(['./check-gps']);
      })
    })
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
