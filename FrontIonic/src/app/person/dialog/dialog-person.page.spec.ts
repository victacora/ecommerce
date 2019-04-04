import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { DialogPersonPage } from './dialog-person.page';

describe('DialogPersonPage', () => {
  let component: DialogPersonPage;
  let fixture: ComponentFixture<DialogPersonPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogPersonPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents();
  }));

  beforeEach(async () => {
    fixture = await TestBed.createComponent(DialogPersonPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
