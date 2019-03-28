import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { CompanyService } from 'src/app/shared/service/company.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalController, NavParams } from '@ionic/angular';
import { Company } from 'src/app/shared/model/company.model';

@Component({
  selector: 'app-dialog-company',
  templateUrl: 'dialog-company.page.html',
  styleUrls: ['dialog-company.page.scss']
})

export class DialogCompanyPage {

  private companyForm: FormGroup;

  private company: Company;

  constructor(
    private companyService: CompanyService,
    formBuilder: FormBuilder,
    navParams: NavParams,
    private modalCtrl: ModalController) {
    this.company = navParams.get('company');
    this.companyForm = formBuilder.group({
      name: [(this.company ? this.company.name : ''), Validators.required],
      nit: [(this.company ? this.company.name : ''), Validators.required],
      phone: [(this.company ? this.company.name : '')],
      cell: [(this.company ? this.company.name : ''), Validators.required]
    });
  }

  save() {
    this.companyService.saveCompany(this.getCompany(this.companyForm)).subscribe(
      result => this.modalCtrl.dismiss(true),
      error => this.modalCtrl.dismiss(false),
    );
  }

  getCompany(companyForm: FormGroup) {
    this.company = this.company ? this.company : new Company();
    this.company.name = companyForm.value.name;
    this.company.name = companyForm.value.name;
    this.company.name = companyForm.value.name;
    return this.company;
  }

  close() {
    this.modalCtrl.dismiss();
  }
}


