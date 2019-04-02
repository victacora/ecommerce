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
      nit: [(this.company ? this.company.nit : ''), Validators.required],
      phone: [(this.company ? this.company.phone : '')],
      movil: [(this.company ? this.company.movil : ''), Validators.required],
      street: [(this.company ? this.company.street : ''), Validators.required]
    });
  }

  save() {
    if (this.company) {
      this.companyService.updateCompany(this.getCompany(this.companyForm)).subscribe(
        result => this.modalCtrl.dismiss(true),
        error => this.modalCtrl.dismiss(false),
      );
    } else {
      this.companyService.saveCompany(this.getCompany(this.companyForm)).subscribe(
        result => this.modalCtrl.dismiss(true),
        error => this.modalCtrl.dismiss(false),
      );
    }

  }

  getCompany(companyForm: FormGroup) {
    this.company = this.company ? this.company : new Company();
    this.company._id = this.company ? this.company._id : '';
    this.company.name = companyForm.value.name;
    this.company.nit = companyForm.value.nit;
    this.company.phone = companyForm.value.phone;
    this.company.movil = companyForm.value.movil;
    this.company.street = companyForm.value.street;
    return this.company;
  }

  close() {
    this.modalCtrl.dismiss();
  }
}


