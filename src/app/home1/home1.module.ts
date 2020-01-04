import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
// import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';

import { IonicModule } from '@ionic/angular';

import { Home1Page } from './home1.page';
// import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';

const routes: Routes = [
  {
    path: '',
    component: Home1Page
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    // BarcodeScanner,
    // QRScanner,
  ],
  declarations: [Home1Page]
})
export class Home1PageModule {}

