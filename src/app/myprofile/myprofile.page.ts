import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import { Storage } from '@ionic/storage';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.page.html',
  styleUrls: ['./myprofile.page.scss'],
})
export class MyprofilePage implements OnInit {

  constructor(public storage: Storage, public router: Router) {}
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
    pincode: ''
  };
  // user = [];

  profile() {

    const navigationExtras: NavigationExtras = {
      state: this.user
    };
    this.router.navigate(['/edit-profile'], navigationExtras);
  }
  ngOnInit() {
  }
  ionViewWillEnter() {
    this.callUser();
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

  }

  cartBtn() {
    this.router.navigateByUrl('/cart');
  }

}
