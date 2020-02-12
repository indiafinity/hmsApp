import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { NavController, AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

import * as firebase from 'firebase/app';
import 'firebase/firestore';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {

  constructor(
    private router: Router,
    private navCtrl: NavController,
    private route: ActivatedRoute,
    private alertCtrl: AlertController,
    private storage: Storage) {

      this.route.queryParams.subscribe(params => {
        this.addedCproducts = [];
        if (this.router.getCurrentNavigation().extras.state) {
          this.addedCproducts = this.router.getCurrentNavigation().extras.state.addedCproducts;
          this.calculate();
        }
      })
    }

    addedCproducts = [];
    addedSproducts = [];
    checkout = [];
    cartTotal = 0;

    currentUser = {
      username: '',
      userId: '',
      email: '',
    };

    user1 = {
      uid: '',
      name: '',
      phone: '',
      email: '',
      flat: '',
      building: '',
      area: '',
      city: '',
      state: '',
      pincode: '',
      ord_uid: ''
    };

    ngOnInit() {}
    
  ionViewWillEnter() {
    this.storage.get('currentUser').then(user => {
      console.log(user);
      this.currentUser = user;
    });
  }

  // loadDummyData() {
  //   this.addedSproducts = [
  //     {
  //       uid: '01',
  //       name: 'Organic Tomotoes',
  //       qty: 4,
  //       image: '../../assets/tomotoes.jpeg',
  //       limit: 5,
  //       total: 15,
  //       mrp: 1000,
  //       sp: 900,
  //     },
  //     {
  //       uid: '02',
  //       name: 'Organic Beetroot',
  //       qty: 3,
  //       image: '../../assets/beetroot.jpg',
  //       limit: 5,
  //       total: 15,
  //       mrp: 100,
  //       sp: 90,
  //     },
  //     {
  //       uid: '03',
  //       name: 'Organic Carrot',
  //       qty: 5,
  //       image: '../../assets/carrot.jpg',
  //       limit: 5,
  //       total: 15,
  //       mrp: 100,
  //       sp: 90,
  //     },
  //     {
  //       uid: '04',
  //       name: 'Organic Corn Cob',
  //       qty: 3,
  //       image: '../../assets/corn.jpg',
  //       limit: 5,
  //       total: 15,
  //       mrp: 100,
  //       sp: 90,
  //     },
  //     {
  //       uid: '05',
  //       name: 'Organic Onion',
  //       qty: 1,
  //       image: '../../assets/onions.jpg',
  //       limit: 5,
  //       total: 15,
  //       mrp: 100,
  //       sp: 90,
  //     },
  //     {
  //       uid: '06',
  //       name: 'Organic Potatoes',
  //       qty: 2,
  //       image: '../../assets/pototoes.jpg',
  //       limit: 5,
  //       total: 15,
  //       mrp: 100,
  //       sp: 90,
  //     },
  //     {
  //       uid: '07',
  //       name: 'Organic Rajma',
  //       qty: 1,
  //       image: '../../assets/rajma.jpg',
  //       limit: 5,
  //       total: 15,
  //       mrp: 100,
  //       sp: 90,
  //     },
  //     {
  //       uid: '08',
  //       name: 'Organic Rice',
  //       qty: 1,
  //       image: '../../assets/rice.jpg',
  //       limit: 5,
  //       total: 15,
  //       mrp: 100,
  //       sp: 90,
  //     },
  //     {
  //       uid: '09',
  //       name: 'Organic Wheat',
  //       qty: 1,
  //       image: '../../assets/wheat.jpg',
  //       limit: 5,
  //       total: 15,
  //       mrp: 100,
  //       sp: 90,
  //     },
  //     {
  //       uid: '10',
  //       name: 'Organic Yellow Dal',
  //       qty: 1,
  //       image: '../../assets/yellowdal.jpg',
  //       limit: 5,
  //       total: 15,
  //       mrp: 100,
  //       sp: 90,
  //     },
  //   ];
  // }

  onEditBtn() {
    this.navCtrl.navigateBack('/product')
  }

  // async StorageCall() {
  //   await this.storage.get('addedProducts').then(products => {
  //     console.log(products);
  //     this.addedSproducts.push({
  //       uid: products.uid,
  //       name: products.name,
  //       qty: products.qty,
  //       image: products.image,
  //       limit: products.limit,
  //       total: products.total,
  //       mrp: products.mrp,
  //       sp: products.sp,
  //     })
  //   });
  //   this.calculate();
  // }

  async PayNow() {
    
    await firebase.firestore().collection('users').where('uid', '==', this.currentUser.userId).get()
    .then((query) => {
      this.user1 = {
        uid: query.docs[0].id,
        name: query.docs[0].data().name,
        phone: query.docs[0].data().phone,
        email: query.docs[0].data().email,
        flat: query.docs[0].data().flat,
        building: query.docs[0].data().building,
        area: query.docs[0].data().area,
        city: query.docs[0].data().city,
        state: query.docs[0].data().state,
        pincode: query.docs[0].data().pincode,
        ord_uid: ''
      };
      if (this.user1.phone.length != 0 && this.user1.flat.length != 0 && this.user1.building.length != 0) {
        if (this.user1.city.length != 0 &&  this.user1.area.length != 0  && this.user1.pincode.length !=0) {
          console.log('all values available');
          // this.PayNowFunction();
        } else {
          console.log('Please fill all details....');
          this.alertFunction();
        }
      } else {
        console.log('Please fill all details..');
        this.alertFunction();
      }
    });

  }
  async alertFunction() {
    const alertM = this.alertCtrl.create({
      header: 'Warning!',
      message: 'You need to update your Profile before placing an order.',
      buttons: [
        {
          text: 'cancel',
          role: 'cancel',
        },
        {
          text: 'ok',
          role: 'submit',
          handler: () => {
            console.log('Navigated to My Profile Page..')
            let navigationExtras: NavigationExtras = {
              state: {
                profile: this.user1,
                cart: this.addedCproducts
              }
            };
            this.navCtrl.navigateForward('/myprofile', navigationExtras);
          }
        }
      ]
    });
    (await alertM).present();
  }
  
  async PayNowFunction() {
    await firebase.firestore().collection('customer-orders').add({
      customer_uid: this.user1.uid,
      pincode: this.user1.pincode,
      total_amt: this.cartTotal,
      customer_email: this.currentUser.email,
      total_items: this.addedCproducts.length,
      timestamp: firebase.firestore.Timestamp.now(),
      status: 'Placed'
    }).then((result) => {
      this.user1.ord_uid = result.id;
      firebase.firestore().collection('customer-orders').doc(result.id).set({
        uid: this.user1.ord_uid
      }, {merge: true});
      }).catch(error => {
        console.log(error.message);
      });
  
      this.addedCproducts.forEach(async prods => {
        // this.checkout.push({
        //   prod_uid: prods.uid,
        //   prod_name: prods.name,
        //   sp: prods.sp,
        //   qty: prods.qty
        // });
        await firebase.firestore().collection('customer-orders').doc(this.user1.ord_uid).collection('items').add({
          uid: '',
          prod_uid: prods.uid,
          prod_name: prods.name,
          qty: prods.qty,
          price: prods.sp,
          total: (prods.sp * prods.qty)
        }).then((itm) => {
          firebase.firestore().collection('customer-orders').doc(this.user1.ord_uid)
          .collection('items').doc(itm.id).update({
            uid: itm.id
          });
        });
      });


    const alertM = await this.alertCtrl.create({
      message: '<span class="text-center"><img src="../../../assets/green-tick-48.png"><h4>Order Placed!!</h4><span>',
    });
    await alertM.present();
    setTimeout(() => {
      alertM.dismiss();
      this.navCtrl.navigateForward('/home1');
    }, 2000);
  }

  calculate() {
    this.addedCproducts.forEach(iters => {
      if (this.addedCproducts.length > 0) {
        let sum = iters.qty * iters.sp;
        this.cartTotal = this.cartTotal + sum;
      } else if (this.addedCproducts.length == 0) {
        this.cartTotal = 0
      } 
    });
  }
}
