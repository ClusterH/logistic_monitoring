import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  constructor(
    public loadingController: LoadingController
  ) { }

  showLoader(message: string) {
    this.loadingController.create({
      spinner: 'crescent',
      cssClass: 'custom-loader-class',
    }).then((res) => {
      res.present();
    });
  }

  // Hide the loader if already created otherwise return error
  hideLoader() {
    this.loadingController.dismiss().then((res) => {

    }).catch((error) => {

    });
  }
}
