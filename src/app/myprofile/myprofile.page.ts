import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { NavController, LoadingController } from '@ionic/angular';

import * as firebase from 'firebase/app';
import 'firebase/firestore';

@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.page.html',
  styleUrls: ['./myprofile.page.scss'],
})
export class MyprofilePage implements OnInit {

  constructor(
    private storage: Storage,
    private loadingCtrl: LoadingController,
    public router: Router,
    private navCtrl: NavController,
    private route: ActivatedRoute) {
      this.route.queryParams.subscribe(() => {
        if (this.router.getCurrentNavigation().extras.state) {
          this.user = this.router.getCurrentNavigation().extras.state.profile;
          this.addedProducts = this.router.getCurrentNavigation().extras.state.addedCProducts;
        }
      });
  }

  addedProducts = [];

  user = {
    uid: '',
    name: '',
    email: '',
    phone: '',
    flat: '',
    building: '',
    area: '',
    city: '',
    state: '',
    pincode: '',
    ord_uid: ''
  };

  profile() {
    const navigationExtras: NavigationExtras = {
      state: {
        profile: this.user,
        addedProducts: this.addedProducts
      }
    }
    this.navCtrl.navigateForward('/edit-profile', navigationExtras);
  }
  ngOnInit() {
  }
  async ionViewWillEnter() {
    (await this.loadingCtrl.create({
      message: 'Please Wait',
      duration: 5000
    })).present();
    if (this.user.uid.length == 0) {
      console.log('Calling values from firebase.')
      this.callUser();
    } else {
      console.log('calling values from NavCtrl.')
    }
  }

  async callUser() {
    await this.storage.get('currentUser').then((val) => {
      if (val != undefined) {
        this.user.uid = val.userId;
        console.log(this.user.uid);
      } 
    });
    
    if (this.user.uid.length > 0) {
      await firebase.firestore().collection('users').doc(this.user.uid).get()
      .then((doc) => {
        if (doc.exists) {
          console.log(doc.data());
          this.user.name = doc.data().name;
          this.user.email = doc.data().email;
          this.user.phone = doc.data().phone;
          this.user.flat = doc.data().flat;
          this.user.building = doc.data().building;
          this.user.area = doc.data().area;
          this.user.city = doc.data().city;
          this.user.state = doc.data().state;
          this.user.pincode = doc.data().pincode;
        } else {
          console.log('No User found!');
        }
      }).catch((error) => {
        console.log(error);
      });
    } else {
      console.log('Please Login..');
    }
    this.loadingCtrl.dismiss();

  }

  cartBtn() {
    let navigationExtras: NavigationExtras = {
      state: {
        addedCProducts: this.addedProducts
      }
    }
    this.navCtrl.navigateForward('/product', navigationExtras);
  }

}
