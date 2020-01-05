import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/firestore';

@Component({
  selector: 'app-product',
  templateUrl: './product.page.html',
  styleUrls: ['./product.page.scss'],
})
export class ProductPage implements OnInit {
  loadedcProducts = [];
  cproducts = [{
    uid: '',
    name: '',
    image: '',
    available: '',
    qty: 0,
  }];

  ngOnInit() {
    this.cproducts = [];

    firebase.firestore().collection('cproducts').get().then((querySnapshot) => {
      querySnapshot.forEach((prods) => {
        this.cproducts.push({
          uid: prods.id,
          name: prods.data().name,
          image: prods.data().image,
          available: prods.data().total,
          qty:  0,
        });
      });
      this.initializeList();
    });
  }

  filterList(evt) {
    this.initializeList();
    console.log(this.loadedcProducts);
    // console.log(evt);
    const searchTerm = evt.srcElement.value;

    if (!searchTerm) {
      return this.initializeList();
    }

    this.cproducts = this.loadedcProducts.filter((product) => {
      if (product.name && searchTerm) {
        if (product.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1) {
          return true;
        }
        return false;
      }
    });
  }

  initializeList() {
    this.loadedcProducts = this.cproducts;
  }

  onPlus(id: any) {
    let val;
    for (const i in this.cproducts) {
      if (this.cproducts[i].uid === id) {
        this.cproducts[i].qty = this.cproducts[i].qty + 1;
        val = i;
      }
    }
    console.log(this.cproducts[val].qty);
  }

  onMinus() {

  }

}
