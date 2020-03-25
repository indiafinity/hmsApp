import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmartBasketPage } from './smart-basket.page';

describe('SmartBasketPage', () => {
  let component: SmartBasketPage;
  let fixture: ComponentFixture<SmartBasketPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmartBasketPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmartBasketPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
