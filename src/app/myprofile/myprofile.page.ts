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
  UserInfo = {
    docId: '',
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
  user = this.UserInfo;

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
    this.storage.get('uid').then((val) => {
      this.UserInfo.uid = val;
      console.log(this.UserInfo.uid);
    });
    await this.storage.get('docId').then((val) => {
      this.UserInfo.docId = val;
      console.log(this.UserInfo.docId);
    });

    await firebase.firestore().collection('users').doc(this.UserInfo.docId).get()
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
  }

}
