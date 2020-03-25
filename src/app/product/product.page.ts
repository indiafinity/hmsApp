import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import { NavigationExtras } from '@angular/router';
import { Storage } from '@ionic/storage';
import { LoadingController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-product',
  templateUrl: './product.page.html',
  styleUrls: ['./product.page.scss'],
})
export class ProductPage implements OnInit {

  cproducts = [{
    uid: '',
    name: '',
    qty: 0,
    image: '',
    limit: 0,
    total: 0,
    mrp: 0,
    sp: 0,
  }];

  addedProducts = [];
  
  searchBar: any;
  items: any;
  plus = '+';
  minus = '-';
  cnt = 0;
  
  constructor(
    private navCtrl: NavController,
    private loadingCtrl: LoadingController) {}

  async ngOnInit() {
    this.cproducts = [];
    this.searchBar = document.querySelector('ion-searchbar');
    (await this.loadingCtrl.create({
      message: 'Please Wait..',
      duration: 5000
    })).present();

    this.loadAllProducts(); // firebase call to load all products
    // this.loadDummyData();   // dummy data for all product 
    this.searchBar.addEventListener('ionInput', this.handleInput);
  }
  
  async loadAllProducts() {
    this.cproducts = [];
    await firebase.firestore().collection('cproducts').orderBy('name')
    .get().then((querySnapshot) => {
      querySnapshot.forEach((prods) => {
        this.cproducts.push({
          uid: prods.id,
          name: prods.data().name,
          qty:  0,
          image: prods.data().image,
          limit: prods.data().limit,
          total: prods.data().total,
          mrp: prods.data().mrp,
          sp: prods.data().sp,
        });
      });
    });
    this.loadingCtrl.dismiss();
  }

  onPlus(id) {
    let val;
    for (let i in this.cproducts) {
      if (this.cproducts[i].uid === id) {
        if (this.cproducts[i].qty < this.cproducts[i].limit) {
          this.cproducts[i].qty = this.cproducts[i].qty + 1;
          val = i;
        } else {
          console.log('Unavailable');
          alert('You have reached maximum limit of this product!!'); // test alert on phone
          break;
        }
      }
    }
    console.log(this.cproducts[val]);
    console.log('id: ' + id);
  }
  
  onMinus(id) {
    let val;
    for (let i in this.cproducts) {
      if (this.cproducts[i].uid === id) {
        if (this.cproducts[i].qty > 0) {
          this.cproducts[i].qty = this.cproducts[i].qty - 1;
          val = i;
        } else {
          console.log('Unavailable');
          break;
        }
      }
    }
    console.log(this.cproducts[val]);
    console.log('id: ' + id);
  }

  loadDummyData() {
    this.cproducts = [
      {
        uid: '01',
        name: 'Organic Tomotoes',
        qty: 0,
        image: '../../assets/tomotoes.jpeg',
        limit: 5,
        total: 15,
        mrp: 100,
        sp: 90,
      },
      {
        uid: '02',
        name: 'Organic Beetroot',
        qty: 0,
        image: '../../assets/beetroot.jpg',
        limit: 5,
        total: 15,
        mrp: 100,
        sp: 90,
      },
      {
        uid: '03',
        name: 'Organic Carrot',
        qty: 0,
        image: '../../assets/carrot.jpg',
        limit: 5,
        total: 15,
        mrp: 100,
        sp: 90,
      },
      {
        uid: '04',
        name: 'Organic Corn Cob',
        qty: 0,
        image: '../../assets/corn.jpg',
        limit: 5,
        total: 15,
        mrp: 100,
        sp: 90,
      },
      {
        uid: '05',
        name: 'Organic Onion',
        qty: 0,
        image: '../../assets/onions.jpg',
        limit: 5,
        total: 15,
        mrp: 100,
        sp: 90,
      },
      {
        uid: '06',
        name: 'Organic Potatoes',
        qty: 0,
        image: '../../assets/pototoes.jpg',
        limit: 5,
        total: 15,
        mrp: 100,
        sp: 90,
      },
      {
        uid: '07',
        name: 'Organic Rajma',
        qty: 0,
        image: '../../assets/rajma.jpg',
        limit: 5,
        total: 15,
        mrp: 100,
        sp: 90,
      },
      {
        uid: '08',
        name: 'Organic Rice',
        qty: 0,
        image: '../../assets/rice.jpg',
        limit: 5,
        total: 15,
        mrp: 100,
        sp: 90,
      },
      {
        uid: '09',
        name: 'Organic Wheat',
        qty: 0,
        image: '../../assets/wheat.jpg',
        limit: 5,
        total: 15,
        mrp: 100,
        sp: 90,
      },
      {
        uid: '10',
        name: 'Organic Yellow Dal',
        qty: 0,
        image: '../../assets/yellowdal.jpg',
        limit: 5,
        total: 15,
        mrp: 100,
        sp: 90,
      },
    ];
  }

  handleInput(event) { // search Bar
    this.items = Array.from(document.querySelectorAll('.prodList'));
    // this.items = Array.from(document.querySelector('.prodList').children);

    const query = event.srcElement.value.toLowerCase();
    // console.log(this.items);
    requestAnimationFrame(() => {
      this.items.forEach((item) => {
        // const shouldShow = item.children[1].textContent.toLowerCase().indexOf(query) > -1;
        const shouldShow = item.textContent.toLowerCase().indexOf(query) > -1;
        item.style.display = shouldShow ? 'block' : 'none';
      }, this);
    });
  }

  async addToCart() {
    this.addedProducts = [];
    this.cproducts.forEach(vals => {
      if (vals.qty > 0) {
        this.addedProducts.push({
          uid: vals.uid,
          name: vals.name,
          qty: vals.qty,
          image: vals.image,
          limit: vals.limit,
          total: vals.total,
          mrp: vals.mrp,
          sp: vals.sp,
        })
      }
    });
    console.log(this.addedProducts);

    let navigateExtras: NavigationExtras = {
      state: {
        addedCproducts: this.addedProducts,
      }
    };
    
    // await this.storage.set('addedProducts', this.addedProducts);
    this.navCtrl.navigateForward('/cart', navigateExtras);
  }

}
