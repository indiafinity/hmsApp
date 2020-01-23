import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-myorders',
  templateUrl: './myorders.page.html',
  styleUrls: ['./myorders.page.scss'],
})
export class MyordersPage implements OnInit {

  constructor(private navCtrl: NavController) { }

  ngOnInit() {
  }

  viewOrder() {
    this.navCtrl.navigateForward('/showorder');
  }

}
