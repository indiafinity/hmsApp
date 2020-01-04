import { Component, OnInit } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
// import { SignupPage } from '../signup/signup.page';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(public navCtrl: NavController, public toastctrl: ToastController, public storage: Storage) {}
  UserInfo = {
    email: '',
    password: '',
  };
  login() {
    firebase.auth().signInWithEmailAndPassword(this.UserInfo.email, this.UserInfo.password)
    .then(async (user) => {
      console.log(user);
      (await this.toastctrl.create({
        message: 'Welcome ' + user.user.displayName, duration: 3000
      })).present();
      this.storage.set('username', user.user.displayName);
      this.getUser(user.user.uid);
      this.navCtrl.navigateRoot('/home1');
      // this.window.
    }).catch(async (err) => {
      console.log(err);
      (await this.toastctrl.create({
        message: err.message, duration: 3000
      })).present();
    });
  }
  ngOnInit() {
  }
  ionViewWillEnter() {
    this.storage.set('username', null);
    // location.reload();
  }
  ionViewDidLeave() {
    location.reload();
  }
  gotosignup() {
    this.navCtrl.navigateForward('/signup');
    // this.navCtrl.pop();
  }

  getUser(Nuid: any) {

    firebase.firestore().collection('users').where('uid', '==', Nuid).get()
        .then((doc) => {
          console.log(doc.docs[0].id);
          console.log('User Found!!');
          this.storage.set('uid', Nuid);
          this.storage.set('docId', doc.docs[0].id);
        }).catch((error) => {
          console.log(error);
        });

    // this.storage.get('uid').then((user) => {
    //   console.log('User from Storage........', user);
    //   if (user != null) {
    //     firebase.firestore().collection('users').where('uid', '==', user).get()
    //     .then((doc) => {
    //       console.log(doc.docs[0].id);
    //       console.log('User Found!!');
    //     }).catch((error) => {
    //       console.log(error);
    //     });
    //   }
    //   // console.log();
    // });
  }
}
