import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { NavController } from '@ionic/angular';
import { MyEvent } from 'src/services/myevent.services';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public selectedIndex = 0;
  public appPages = [
    {
      title: 'Vehicle Selector',
      sub_title: 'List of vehicles',
      url: '/vehicle',
      icon: 'zmdi zmdi-store ion-text-start'
    },
    {
      title: 'Route List',
      sub_title: 'List of Route',
      url: '/route',
      icon: 'zmdi zmdi-pin-drop ion-text-start'
    },
    {
      title: 'Confirm Route Change',
      sub_title: 'Check GPS Status',
      url: '/check-gps',
      icon: 'zmdi zmdi-gps-dot ion-text-start'
    },
    {
      title: 'Hazard Report',
      sub_title: 'Hazard Report',
      url: '/hazard-report',
      icon: 'zmdi zmdi-gps-dot ion-text-start'
    },
  ];

  constructor(
    private platform: Platform, private navCtrl: NavController,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private myEvent: MyEvent
  ) {
    this.initializeApp();
    this.navCtrl.navigateRoot(['./']);
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  ngOnInit() {
    const path = window.location.pathname.split('folder/')[1];
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }
  }


  logOut() {
    this.navCtrl.navigateRoot(['./signin']);
  }

}
