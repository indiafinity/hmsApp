import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/firestore';
import { Storage } from '@ionic/storage';
import { LoadingController, NavController } from '@ionic/angular';
import { NavigationExtras } from '@angular/router';

// import * as _ from 'underscore';

@Component({
  selector: 'app-smart-basket',
  templateUrl: './smart-basket.page.html',
  styleUrls: ['./smart-basket.page.scss'],
})
export class SmartBasketPage implements OnInit {

  constructor(
    private storage: Storage,
    private loadingCtrl: LoadingController,
    private navCtrl: NavController) { }

  currentUser = {
    username: '',
    userId: '',
    email: ''
  };

  searchBar: any;
  items: any;
  plus = '+';
  minus = '-';
  unique = [];
  previous = [];
  addedProducts = [];

  orders = [];
  ordersNew = [];
  ordersArrDum = [];

  // ordersArr = [
  //   "Corn (500 gm)",
  //   "Organic Beetroot (1kg)",
  //   "Corn (500 gm)",
  //   "Organic Beetroot (1kg)",
  //   "Corn (500 gm)",
  //   "Fresh Carrot (500 gm)",
  //   "Organic Beetroot (1kg)",
  //   "Fresh Carrot (500 gm)"
  // ];
  // ordersDummy = [
  //   ["Corn (500 gm)", "Organic Beetroot (1kg)"],
  //   ["Corn (500 gm)", "Organic Beetroot (1kg)"],
  //   ["Corn (500 gm)", "Fresh Carrot (500 gm)", "Organic Beetroot (1kg)"],
  //   ["Fresh Carrot (500 gm)"]
  // ];
  rules = [];
  rulesJson: any;

  ngOnInit() {
    this.searchBar = document.querySelector('ion-searchbar');
    this.searchBar.addEventListener('ionInput', this.handleInput);
  }

  async ionViewWillEnter() {
    await this.storage.get('currentUser').then((user) => {
      this.currentUser = user;
      console.log(this.currentUser);
    });
    // this.firebaseDB();
    // this.uniqueSearch(this.ordersDummy, this.ordersArr);
    (await this.loadingCtrl.create({
      message: 'Please Wait',
      duration: 5000
    })).present();
    this.smartBasket()
    this.firebaseDB()
  }

  uniqueSearch(nestedArr: string[][], simpleArr: string[]) {
    var inLen = [];
    var outLen = nestedArr.length;
    var simLen = simpleArr.length;
    for (var i = 0; i < simLen; i++) {
      var x = simpleArr[i].toString();
      var ind = nestedArr
      inLen.push(ind);
    }
    console.log(outLen);
    console.log(inLen);
    for (var i = 0; i < outLen; i++) {
      for (var j = 0; j < inLen[i]; j++) {
        for (var k = 0; k < simLen; k++) {
          if (simpleArr[k] !== nestedArr[i][j]) {
            
          }
        }
      }
    }
    for (var i = 0; i < simLen; i++) {
      if (simpleArr[i] in nestedArr) {
        console.log(simpleArr[i])
      } 
    }

  }

  async firebaseDB() {
    await firebase.firestore().collection('customer-orders')
    .where('customer_uid', '==', this.currentUser.userId).get()
    .then(querySnapshot => {
      var grp = querySnapshot.size;
      var itmArray = [];
      querySnapshot.docs.forEach(itemcol => {
        itmArray.push(itemcol.id);
      })
      for (var i = 0; i < grp; i++) {
        firebase.firestore().collection('customer-orders').doc(itmArray[i]).collection('items')
        .get().then(items => {
          var arr = [];
          var cnt = items.docs.length;
          for (var i = 0; i < cnt; i++) {
            arr.push(items.docs[i].data().prod_name)
          }
          this.ordersNew.push(arr);
        });
      }
    }).catch(error => {
      console.log(error);
    });
    // console.log(this.orders);
    for (let x = 0; x < this.ordersNew.length; x++) {
      firebase.firestore().collection('cproducts').where('name', '==', this.ordersNew[x]).get()
      .then(prods => {
        this.previous.push({
          uid: prods.docs[0].id,
          name: prods.docs[0].data().name,
          image: prods.docs[0].data().image,
          limit: prods.docs[0].data().limit,
          total: prods.docs[0].data().total,
          mrp: prods.docs[0].data().mrp,
          sp: prods.docs[0].data().sp,
          qty: 0
        });
      });
    }
    this.orders = this.previous;
  }

  async smartBasket() {
    var n = 5;
    var dbLen = 0;
    await firebase.database().ref('db0').once('value').then(snapshot => {
      dbLen = snapshot.numChildren();
    });
    console.log(dbLen);
    for (var i = 0; i < n; i++) {
      var k = Math.floor((Math.random() * (dbLen - 0 + 1))+1);
      var path = 'db0/' + k.toString() + '/';
      await firebase.database().ref(path).once('value').then(query => {
        this.rules = [];
        query.forEach(val => {
          // console.log(val.val());
          this.rules.push(val.val());
        });
        for (var j = 0; j < this.rules.length; j+=4) {
          console.log(this.rules[j].toString());
          let product = this.rules[j].toString();

          firebase.firestore().collection('cproducts').where('name', "==", product).get()
          .then(prods => {
            this.ordersArrDum.push({
              uid: prods.docs[0].id,
              name: prods.docs[0].data().name,
              image: prods.docs[0].data().image,
              limit: prods.docs[0].data().limit,
              total: prods.docs[0].data().total,
              mrp: prods.docs[0].data().mrp,
              sp: prods.docs[0].data().sp,
              qty: 0
            });
          }).catch(error => {
            console.log(error);
          });
        }
      });
    }
    this.loadingCtrl.dismiss();
    this.unique = this.ordersArrDum;
  }

  onPlus(id) {
    let val;
    for (let i in this.unique) {
      if (this.unique[i].uid === id) {
        if (this.unique[i].qty < this.unique[i].limit) {
          this.unique[i].qty = this.unique[i].qty + 1;
          val = i;
        } else {
          console.log('Unavailable');
          alert('You have reached maximum limit of this product!!'); // test alert on phone
          break;
        }
      }
    }
    console.log(this.unique[val]);
    console.log('id: ' + id);
  }
  
  onMinus(id) {
    let val;
    for (let i in this.unique) {
      if (this.unique[i].uid === id) {
        if (this.unique[i].qty > 0) {
          this.unique[i].qty = this.unique[i].qty - 1;
          val = i;
        } else {
          console.log('Unavailable');
          break;
        }
      }
    }
    console.log(this.unique[val]);
    console.log('id: ' + id);
  }

  async addToCart() {
    this.addedProducts = [];
    this.unique.forEach(vals => {
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
        });
      }
    });
    console.log(this.addedProducts);

    let navigateExtras: NavigationExtras = {
      state: {
        addedCproducts: this.addedProducts,
      }
    };
    
    // await this.storage.set('addedProducts', this.addedProducts);
    // this.navCtrl.navigateForward('/cart', navigateExtras);
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

}
