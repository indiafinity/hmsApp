import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ActivatedRoute, Router } from '@angular/router';

import * as firebase from 'firebase/app';
import 'firebase/firestore';

@Component({
  selector: 'app-showorder',
  templateUrl: './showorder.page.html',
  styleUrls: ['./showorder.page.scss'],
})
export class ShoworderPage implements OnInit {

  constructor(
    private storage: Storage,
    private route: ActivatedRoute,
    private router: Router) { 
    this.route.queryParams.subscribe(params => {
      this.order_uid = '';
      if (this.router.getCurrentNavigation().extras.state) {
        this.order_uid = this.router.getCurrentNavigation().extras.state.order_uid;
        this.timestamp = this.router.getCurrentNavigation().extras.state.timestamp;
      }
    });
  }

  order_uid: '';
  timestamp: any;

  oproducts = [];
  currentUser = {
    userId: '',
    username: '',
    email: ''
  };

  async ionViewWillEnter() {
    await this.storage.get('currentUser').then((user) => {
      console.log(user);
      this.currentUser = {
        userId: user.userId,
        username: user.username,
        email: user.email
      };
    });
    console.log(this.order_uid);
    this.orderItemsFirebase()
    // this.displayOrderFirebase();
  }

  ngOnInit() {
  }

  orderItemsFirebase() {
    firebase.firestore().collection('customer-orders').doc(this.order_uid).collection('items').get()
    .then(items => {
      items.forEach(itemOne => {
        console.log(itemOne.data().prod_name)
        this.oproducts.push({
          uid: itemOne.id,
          prod_name: itemOne.data().prod_name,
          prod_uid: itemOne.data().prod_uid,
          qty: itemOne.data().qty,
          total: itemOne.data().total,
          price: itemOne.data().price
        });
      });
    });
  }

  async displayOrderFirebase() {
    await firebase.firestore().collection('customer-orders')
    .where('customer_uid', '==', this.currentUser.userId).get().then(querySnapshot => {
      console.log(querySnapshot.size);
      querySnapshot.forEach(subQuery => {
        firebase.firestore().collection('customer-orders').doc(subQuery.id).collection('items').get()
        .then(items => {
          items.forEach(itemOne => {
            console.log(itemOne.data().prod_name)
            this.oproducts.push({
              uid: itemOne.id,
              prod_name: itemOne.data().prod_name,
              prod_uid: itemOne.data().prod_uid,
              qty: itemOne.data().qty,
              total: itemOne.data().total,
              price: itemOne.data().price
            });
          });
        });
      });
    });
  }

}
