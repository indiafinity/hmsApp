import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home1',
  templateUrl: './home1.page.html',
  styleUrls: ['./home1.page.scss'],
})
export class Home1Page implements OnInit {
  encodeData: any;
  scannedData: {};

  constructor(private barcodeScanner: BarcodeScanner, private router: Router ) {
    this.encodeData = 'https://www.FreakyJolly.com';
  }

  ngOnInit() {
  }

  onBarcode() {
    // this.barcodeScanner.encode(this.barcodeScanner.Encode.TEXT_TYPE, 'farmer-new-data').then((encodeData) => {
    //   console.log(encodeData);
    // });
    // this.barcodeScanner.scan().then((barData) => {
    //   this.scannedData = JSON.stringify(barData);
    //   console.log(barData);
    //   console.log('-------');
    //   console.log(this.scannedData);
    // }).catch((error) => {
    //   console.log(error);
    // });
  }

  productspage() {
    this.router.navigateByUrl('/product');
  }

}
