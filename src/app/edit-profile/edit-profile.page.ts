import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { NavController, ToastController, AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

import * as firebase from 'firebase/app';
import 'firebase/firestore';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {

  constructor(
    public activatedRoute: ActivatedRoute,
    public router: Router,
    public navCtrl: NavController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public storage: Storage) {

    this.activatedRoute.queryParams.subscribe(() => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.data = this.router.getCurrentNavigation().extras.state.profile;
        this.addedProducts = this.router.getCurrentNavigation().extras.state.addedProducts;
        // console.log(this.data);
      }
    });
  }

  data: any = [];
  addedProducts: any = [];

  cancel() {
    let navigationExtras: NavigationExtras = {
      state: {
        profile: this.data,
        addedCProducts: this.addedProducts
      }
    }
    this.navCtrl.navigateBack('/myprofile', navigationExtras);
  }

  updateData() {
    console.log(this.data);
    firebase.firestore().collection('users').doc(this.data.uid).set({
      name: this.data.name,
      email: this.data.email,
      phone: this.data.phone,
      flat: this.data.flat,
      building: this.data.building,
      area: this.data.area,
      city: this.data.city,
      state: this.data.state,
      pincode: this.data.pincode
    }, {merge: true})
    .then(async () => {
      console.log();
      (await this.alertCtrl.create({
        header: 'Success!!',
        message: 'Profile has been updated..',
        buttons: [
          {
            text: 'ok',
            role: 'submit',
            handler: () => {
              let navigationExtras: NavigationExtras = {
                state: {
                  profile: this.data,
                  addedCProducts: this.addedProducts
                }
              }
              this.navCtrl.navigateBack('/myprofile', navigationExtras);
          }
        }]
      })).present();
    })
    .catch(async (error) => {
      console.log(error);
      (await this.toastCtrl.create({
        message: error.message, duration: 3000
      })).present();
    });
  }

  ngOnInit() {
  }

}
