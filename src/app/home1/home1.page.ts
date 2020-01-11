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
    const options = {
      prompt : "Place the product barcode inside the Scan Area",
      resultDisplayDuration: 0,
    }
    this.barcodeScanner.scan(options).then(result => {
      alert(result.text)
    })
  }

  productspage() {
    this.router.navigateByUrl('/product');
  }

  cartBtn() {
    this.router.navigateByUrl('/cart');
  }

}
