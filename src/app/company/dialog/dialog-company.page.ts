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



  constructor(
    private companyService: CompanyService,
    formBuilder: FormBuilder,
    navParams: NavParams,
    private modalCtrl: ModalController) {
    const company: Company = navParams.get('company');
    this.companyForm = formBuilder.group({
      name: [(company ? company.name : ''), Validators.required],
      nit: [(company ? company.name : ''), Validators.required],
      phone: [(company ? company.name : '')],
      cell: [(company ? company.name : ''), Validators.required]
    });
  }

  save() {
    this.companyService.saveCompany(this.companyForm.value).subscribe(
      result => this.modalCtrl.dismiss(true),
      error => this.modalCtrl.dismiss(false),
    );
  }

  close() {
    this.modalCtrl.dismiss();
  }
}


