import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NavController, AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

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
          // this.storage.set('addedProducts', this.addedCproducts);
        }
      })
    }

    addedCproducts = [];
    addedSproducts = [];
    cartTotal = 0;
    currentUser = [];
    
  ngOnInit() {
    // console.log(this.addedCproducts);
    // this.storage.remove('addedProducts');
    // this.storage.get('addedProducts').then(products => {
    //   console.log(products);
    //   this.addedSproducts.push({
    //     uid: products.uid,
    //     name: products.name,
    //     qty: products.qty,
    //     image: products.image,
    //     limit: products.limit,
    //     total: products.total,
    //     mrp: products.mrp,
    //     sp: products.sp,
    //   })
    // });
    // console.log(this.addedCproducts);
    this.loadDummyData()
    this.addedSproducts.forEach(iters => {
      if (this.addedSproducts.length > 0) {
        let sum = iters.qty * iters.sp
        this.cartTotal = this.cartTotal + sum;
      }
    })
  }

  loadDummyData() {
    this.addedSproducts = [
      {
        uid: '01',
        name: 'Organic Tomotoes',
        qty: 4,
        image: '../../assets/tomotoes.jpeg',
        limit: 5,
        total: 15,
        mrp: 1000,
        sp: 900,
      },
      {
        uid: '02',
        name: 'Organic Beetroot',
        qty: 3,
        image: '../../assets/beetroot.jpg',
        limit: 5,
        total: 15,
        mrp: 100,
        sp: 90,
      },
      {
        uid: '03',
        name: 'Organic Carrot',
        qty: 5,
        image: '../../assets/carrot.jpg',
        limit: 5,
        total: 15,
        mrp: 100,
        sp: 90,
      },
      {
        uid: '04',
        name: 'Organic Corn Cob',
        qty: 3,
        image: '../../assets/corn.jpg',
        limit: 5,
        total: 15,
        mrp: 100,
        sp: 90,
      },
      {
        uid: '05',
        name: 'Organic Onion',
        qty: 1,
        image: '../../assets/onions.jpg',
        limit: 5,
        total: 15,
        mrp: 100,
        sp: 90,
      },
      {
        uid: '06',
        name: 'Organic Potatoes',
        qty: 2,
        image: '../../assets/pototoes.jpg',
        limit: 5,
        total: 15,
        mrp: 100,
        sp: 90,
      },
      {
        uid: '07',
        name: 'Organic Rajma',
        qty: 1,
        image: '../../assets/rajma.jpg',
        limit: 5,
        total: 15,
        mrp: 100,
        sp: 90,
      },
      {
        uid: '08',
        name: 'Organic Rice',
        qty: 1,
        image: '../../assets/rice.jpg',
        limit: 5,
        total: 15,
        mrp: 100,
        sp: 90,
      },
      {
        uid: '09',
        name: 'Organic Wheat',
        qty: 1,
        image: '../../assets/wheat.jpg',
        limit: 5,
        total: 15,
        mrp: 100,
        sp: 90,
      },
      {
        uid: '10',
        name: 'Organic Yellow Dal',
        qty: 1,
        image: '../../assets/yellowdal.jpg',
        limit: 5,
        total: 15,
        mrp: 100,
        sp: 90,
      },
    ];
  }

  onEditBtn() {
    this.navCtrl.navigateBack('/product')
    // this.router.navigateByUrl('/product');
  }

  async PayNow() {
    this.storage.get('currentUser').then(user => {
      console.log(user);
    })
    const alert = await this.alertCtrl.create({
      message: '<span class="text-center"><img src="../../../assets/green-tick-48.png"><h4>Order Placed!!</h4><span>',
      // buttons: ['dismiss']
    });
    await alert.present();
    setTimeout(() => {
      alert.dismiss();
      this.navCtrl.navigateForward('home1');
    }, 2000);
  }
}
