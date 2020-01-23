import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { Router } from '@angular/router';

import * as firebase from 'firebase/app';
import 'firebase/firestore';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home1',
  templateUrl: './home1.page.html',
  styleUrls: ['./home1.page.scss'],
})
export class Home1Page implements OnInit {
  encodeData: any;
  scannedData = {
    uid: '',
    taluka: '',
    farmer: ''
  };

  constructor(private barcodeScanner: BarcodeScanner, private router: Router, private alertCtrl: AlertController) {
    this.encodeData = 'https://www.FreakyJolly.com';
  }

  alertM: any;

  ngOnInit() {
  }

  async onBarcode() {
    const options = {
      prompt : "Place the product QR Code inside the Scan Area",
      resultDisplayDuration: 0,
    }
    this.barcodeScanner.scan(options).then(async result => {
      //  this.alertM = this.alertCtrl.create({
      //   header: 'Loading please wait for 5 seconds...',
        
      // })
      // alert(result.text)
      await firebase.firestore().collection('farmers').where('uid', '==', result.text).get()
      .then(async query => {
        this.scannedData = {
          uid: query.docs[0].id.toString(),
          taluka: query.docs[0].data().taluka,
          farmer: query.docs[0].data().fname + query.docs[0].data().lname
        };
        // (await this.alertM).disimiss();
        alert('Your Product has been brought to you from the village of ' +this.scannedData.taluka+'. Organically grown by '+this.scannedData.farmer);
      });
    });

  }
  // Your Product has been brought to you from the village of [village]. Organically grown by [farmer].
  productspage() {
    this.router.navigateByUrl('/product');
  }

  cartBtn() {
    this.router.navigateByUrl('/cart');
  }
  contactUs() {
    this.router.navigateByUrl('/contact-us');
  }
  myOrders() {
    this.router.navigateByUrl('/myorders');
  }

}
