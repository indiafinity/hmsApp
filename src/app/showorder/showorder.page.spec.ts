import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoworderPage } from './showorder.page';

describe('ShoworderPage', () => {
  let component: ShoworderPage;
  let fixture: ComponentFixture<ShoworderPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShoworderPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoworderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
