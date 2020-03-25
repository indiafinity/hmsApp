import { Component, OnInit } from '@angular/core';
import { NavController, ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss'],
})
export class PaymentPage implements OnInit {

  payment: number;
  items: number;
  paymentMode: string;
  wallet: number;

  constructor(
    private modalCtrl: ModalController,
    private navParams: NavParams) { }

  ngOnInit() {
    console.table(this.navParams);
    this.payment = this.navParams.data.amount;
    this.items = this.navParams.data.items;
    this.wallet = this.navParams.data.wallet;
  }

  async onCOD() {
    await this.modalCtrl.dismiss('cod');
  }

  async onWallet() {
      if(this.payment < this.wallet) {
        await this.modalCtrl.dismiss('wallet');
      } else {
        alert('Insufficient Balance..');
      }
  }

  async onCancel() {
    await this.modalCtrl.dismiss('cancelled');
  }

  radioGrpEvent(event: any) {
    console.log(event.detail.value);
    this.paymentMode = event.detail.value;
  }

  

}
