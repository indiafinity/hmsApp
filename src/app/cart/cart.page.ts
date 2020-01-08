import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
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
    
  ngOnInit() {
    console.log(this.addedCproducts);
    this.storage.remove('addedProducts');
    this.storage.get('addedProducts').then(products => {
      console.log(products);
      // this.addedSproducts = products;
    });
    // console.log(this.addedSproducts);
  }

  onEditBtn() {
    this.navCtrl.navigateBack('/product')
    // this.router.navigateByUrl('/product');
  }
}
