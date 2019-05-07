import { Component, OnInit, ViewChild } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { Page } from 'src/app/shared/model/page.model';
import { Company } from 'src/app/shared/model/company.model';
import { CompanyService } from 'src/app/shared/service/company.service';
import { ModalController, AlertController, ToastController } from '@ionic/angular';
import { DialogCompanyPage } from '../dialog/dialog-company.page';
import { isBoolean } from 'util';
import { SessionService } from 'src/app/shared/service/session.service';

@Component({
  selector: 'app-list-company',
  templateUrl: 'list-company.page.html',
  styleUrls: ['list-company.page.scss']
})

export class ListCompanyPage implements OnInit {

  rows = new Array<Company>();

  page = new Page();

  filter = '';

  activateCompany: Company;

  @ViewChild(DatatableComponent) table: DatatableComponent;

  constructor(private companyService: CompanyService,
    private modalController: ModalController,
    public alertController: AlertController,
    public toastController: ToastController,
    public sessionService: SessionService) {
    this.page = new Page();
    this.sessionService.getActivateCompany().then(
      result => {
        this.activateCompany = JSON.parse(result);
      });
  }

  updateFilter() {
    this.setPage({ offset: 0, filter: (this.filter === '' ? '-' : this.filter) });
  }

  clearFilter() {
    this.filter = '';
    this.setPage({ offset: 0, filter: '-' });
  }

  ngOnInit() {
    this.setPage({ offset: 0, filter: '-' });
  }

  setPage(pageInfo) {
    this.page.pageNumber = pageInfo.offset;
    this.page.filter = !pageInfo.filter ? '-' : pageInfo.filter;
    this.companyService.getCompanies(this.page).subscribe(pagedData => {
      this.page = pagedData.page;
      this.rows = pagedData.data;
    });
  }

  async edit(company) {
    const modal = await this.modalController.create({
      component: DialogCompanyPage,
      componentProps: { company: company }
    });
    modal.onDidDismiss().then((result: any) => {
      const response = result.data;
      if (isBoolean(response)) {
        if (response) {
          this.setPage({ offset: this.page.pageNumber, filter: (this.filter === '' ? '-' : this.filter) });
        }
        this.showOperationResult(response);
      }
    });

    return await modal.present();
  }

  async delete(company) {
    const alert = await this.alertController.create({
      header: 'Advertencia',
      message: '¿Está seguro de realizar la eliminación del registro seleccionado?',
      buttons: [
        'Cancelar', {
          text: 'Aceptar',
          handler: _ => {
            this.companyService.deleteCompany(company._id).subscribe(
              result => {
                if (isBoolean(result)) {
                  if (result) {
                    this.setPage({ offset: this.page.pageNumber, filter: (this.filter === '' ? '-' : this.filter) });
                  }
                  this.showOperationResult(result);
                }
              },
              error => this.showOperationResult(false));
          }
        }]
    });
    await alert.present();
  }

  async showOperationResult(result) {
    const toast = await this.toastController.create({
      message: result ? 'Operación realizada con éxito' : 'Ocurrió un error procesando la petición',
      showCloseButton: true,
      duration: 1500,
      position: 'top',
      closeButtonText: 'Aceptar'
    });
    toast.present();
  }

  async create() {
    const modal = await this.modalController.create({
      component: DialogCompanyPage
    });
    modal.onDidDismiss().then((result: any) => {
      const response = result.data;
      if (isBoolean(response)) {
        if (response) {
          this.setPage({ offset: this.page.pageNumber, filter: (this.filter === '' ? '-' : this.filter) });
        }
        this.showOperationResult(response);
      }
    });
    return await modal.present();
  }

  isSelectCompany(row) {

    return !!this.activateCompany && this.activateCompany._id === row._id;
  }

  selectCompany(row, event) {
    if (event.currentTarget.checked) {
      this.sessionService.setActivateCompany(row);
    } else {
      this.sessionService.removeActivateCompany();
    }
  }

}
