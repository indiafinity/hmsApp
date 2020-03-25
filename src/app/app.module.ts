import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ImageModalPageModule } from './image-modal/image-modal.module';
import { IonicStorageModule } from '@ionic/storage';

import * as firebase from 'firebase/app';

import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { PaymentPageModule } from './payment/payment.module';

const firebaseConfig = {
  apiKey: 'AIzaSyCJCweI34qs89iMubJO1rFh47lZaqY-lPw',
  authDomain: 'cosmo-ecosystem-care.firebaseapp.com',
  databaseURL: 'https://cosmo-ecosystem-care.firebaseio.com',
  projectId: 'cosmo-ecosystem-care',
  storageBucket: 'cosmo-ecosystem-care.appspot.com',
  messagingSenderId: '714057783914',
  appId: '1:714057783914:web:834463bf2c1b6ae44c4813',
  measurementId: 'G-B61CMJE71Q'
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot(),
    AppRoutingModule,
    ImageModalPageModule,
    PaymentPageModule
    ],
  providers: [
    StatusBar,
    SplashScreen,
    BarcodeScanner,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
