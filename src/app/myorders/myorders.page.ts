import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { NavigationExtras } from '@angular/router';

import * as firebase from 'firebase/app';
import 'firebase/firestore';

@Component({
  selector: 'app-myorders',
  templateUrl: './myorders.page.html',
  styleUrls: ['./myorders.page.scss'],
})
export class MyordersPage implements OnInit {

  constructor(private navCtrl: NavController, private storage: Storage, private loadingCtrl: LoadingController) { }

  currentUser = {
    username: '',
    userId: '',
    email: ''
  };

  ordersList = [];

  async ionViewWillEnter() {
    this.ordersList = [];
    await this.storage.get('currentUser').then((user) => {
      this.currentUser = user;
      console.log(this.currentUser);
    });
    (await this.loadingCtrl.create({
      message: 'Please Wait',
      duration: 5000
    })).present();
    this.ordersFirebase();
  }

  ngOnInit() {
  }

  viewOrder(ord_id: string, timestamp: any) {
    console.log(ord_id);

    let navigationExtras: NavigationExtras = {
      state: {
        order_uid: ord_id,
        timestamp: timestamp
      }
    }
    this.navCtrl.navigateForward('/showorder', navigationExtras);
  }

  async ordersFirebase() {
    await firebase.firestore().collection('customer-orders')
    .where('customer_uid', '==', this.currentUser.userId).orderBy('timestamp')
    .get().then((querySnapshot) => {
      console.log('Total Orders: ' + querySnapshot.size);
      querySnapshot.forEach((query) => {
        this.ordersList.push({
          uid: query.id,
          status: query.data().status.toLowerCase(),
          timestamp: query.data().timestamp,
          total_amt: query.data().total_amt,
          total_items: query.data().total_items
        });
      });
    }).catch(error => {
      console.log(error);
      console.log(error.message);
    });
    console.log(this.ordersList)
  }

}
