import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';

import { Platform, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  username: any;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private storage: Storage,
    private navCtrl: NavController
  ) {
    // this.storage.set('username', null);
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });

    this.storage.get('currentUser').then(async (val) => {
      if (val == undefined) {
        this.username = 'Guest';
        // this.navCtrl.navigateRoot('/login'); // forces user to login
      } else {
        this.username = await val.username;
        console.log('User: ' + val.username);
      }
    });

  }
}
