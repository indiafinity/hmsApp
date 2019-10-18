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

// import { firebase } from 'firebase';
import * as firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyBpDd9DwV7p-Q18UEGjS90APDMznXPMYnY',
    authDomain: 'hmsapp-cosmo.firebaseapp.com',
    databaseURL: 'https://hmsapp-cosmo.firebaseio.com',
    projectId: 'hmsapp-cosmo',
    storageBucket: 'hmsapp-cosmo.appspot.com',
    messagingSenderId: '251424807517',
    appId: '1:251424807517:web:b3393d1f39779e8096cbb4',
    measurementId: 'G-G9FRRVVS0D'
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
    ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
