import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';

import { Platform, NavController, MenuController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';

import * as firebase from 'firebase/app';
import 'firebase/firestore';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  username: any;
  scannedData = {
    uid: '',
    taluka: '',
    farmer: ''
  };
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private storage: Storage,
    private navCtrl: NavController,
    private menuCtrl: MenuController,
    private barcodeScanner: BarcodeScanner
  ) {
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

  profile() {
    this.navCtrl.navigateForward('/myprofile');
    this.menuCtrl.close();
  }
  home() {
    this.navCtrl.navigateRoot('/home1');
    this.menuCtrl.close();
  }
  cart() {
    this.navCtrl.navigateForward('/product');
    this.menuCtrl.close();
  }
  basket() {
    this.navCtrl.navigateForward('/smart-basket');
    this.menuCtrl.close();
  }
  orders() {
    this.navCtrl.navigateForward('/myorders');
    this.menuCtrl.close();
  }
  wallet() {
    this.navCtrl.navigateForward('/wallet');
    this.menuCtrl.close();
  }
  qrCode() {
    this.menuCtrl.close();
    const options = {
      prompt : "Place the product QR Code inside the Scan Area",
      resultDisplayDuration: 0,
    }
    this.barcodeScanner.scan(options).then(async result => {
      await firebase.firestore().collection('farmers').where('uid', '==', result.text).get()
      .then(async query => {
        this.scannedData = {
          uid: query.docs[0].id.toString(),
          taluka: query.docs[0].data().taluka,
          farmer: query.docs[0].data().fname + ' ' + query.docs[0].data().lname
        };
        alert('Your Product has been brought to you from the village of ' +this.scannedData.taluka+'. Organically grown by '+this.scannedData.farmer);
      });
    });
  }
  contactUs() {
    this.navCtrl.navigateForward('/contact-us');
    this.menuCtrl.close();
  }
  logout() {
    this.navCtrl.navigateRoot('/login');
    this.menuCtrl.close();
  }

}
