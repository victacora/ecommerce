import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { DialogCompanyPage } from './dialog-company.page';

describe('DialogCompanyPage', () => {
  let component: DialogCompanyPage;
  let fixture: ComponentFixture<DialogCompanyPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogCompanyPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents();
  }));

  beforeEach(async () => {
    fixture = await TestBed.createComponent(DialogCompanyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
