import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';

import * as firebase from 'firebase/app';
import 'firebase/firestore';

@Component({
  selector: 'app-showorder',
  templateUrl: './showorder.page.html',
  styleUrls: ['./showorder.page.scss'],
})
export class ShoworderPage implements OnInit {

  constructor(private storage: Storage) { }

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
    this.displayOrderFirebase();
  }

  ngOnInit() {
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
            })
          })
        })
      })
    })
  }

}
