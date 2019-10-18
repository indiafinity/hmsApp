import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
    abc = ['beetroot1.png', 'carrot1.png', 'rajma1.png'];
    abcd = [
      {
        image: 'beetroot1.png',
        title: 'Beetroot',
        subtitle: 'Organic',
      },
      {
        image: 'carrot1.png',
        title: 'Carrot',
        subtitle: 'Fresh & Organic',
      },
      {
        image: 'rajma1.png',
        title: 'Rajma',
        subtitle: 'Organic',
      },

    ];
   sliderOpts = {
      zoom: false,
      slidesPerView: 1.5,
      centeredSlides: true,
      spaceBetween: 10
};
  constructor(private modalController: ModalController, private router: Router) {

  }

  orderNow() {
    this.router.navigateByUrl('/product');
  }
}
