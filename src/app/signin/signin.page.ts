import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage implements OnInit {

  constructor(private route: Router, public menuCtrl: MenuController) {
    this.menuCtrl.enable(false);
  }

  ngOnInit() {
  }

  location() {
    this.route.navigate(['./vehicle']);
  }
  signup() {
    this.route.navigate(['./signup']);
  }
  forgotpassword() {
    this.route.navigate(['./forgot']);
  }

}
