import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { ListProductPage } from './list-product.page';

describe('ListProductPage', () => {
  let component: ListProductPage;
  let fixture: ComponentFixture<ListProductPage>;
  let listPage: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListProductPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents();
  }));

  beforeEach(async () => {
    fixture = await TestBed.createComponent(ListProductPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a list of 10 elements', () => {
    listPage = fixture.nativeElement;
    const items = listPage.querySelectorAll('ion-item');
    expect(items.length).toEqual(10);
  });

});
