import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
@Component({
  selector: 'app-title',
  templateUrl: './title.page.html',
  styleUrls: ['./title.page.scss'],
})
export class TitlePage implements OnInit {

  constructor(private modalController: ModalController) { }

  ngOnInit() {
  }
 dismiss(){
   this.modalController.dismiss();
 }
}
