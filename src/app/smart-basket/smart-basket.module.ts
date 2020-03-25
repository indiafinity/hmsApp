import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SmartBasketPage } from './smart-basket.page';

const routes: Routes = [
  {
    path: '',
    component: SmartBasketPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [SmartBasketPage]
})
export class SmartBasketPageModule {}
