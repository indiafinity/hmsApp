import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
    abc = ['beetroot.jpg', 'carrot.jpg', 'rajma.jpg'];
   sliderOpts = {
      zoom: false,
      slidesPerView: 1.5,
      centeredSlides: true,
      spaceBetween: 20
};
  constructor(private modalController: ModalController) {

  }
  openPreview() {}
}
