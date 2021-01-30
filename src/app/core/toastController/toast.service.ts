import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({ providedIn: 'root' })
export class ToastService {

  constructor(private toastCtrl: ToastController) { }

  async showToast(color: string, message: string) {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 2000,
      color: color,
      position: 'bottom',
      animated: true,
      mode: 'md'
    });
    toast.present();
  }
}