import { Component, OnInit, ViewChild } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { Page } from 'src/app/shared/model/page.model';
import { Company } from 'src/app/shared/model/company.model';
import { CompanyService } from 'src/app/shared/service/company.service';
import { ModalController, AlertController, ToastController } from '@ionic/angular';
import { DialogCompanyPage } from '../dialog/dialog-company.page';
import { isBoolean } from 'util';

@Component({
  selector: 'app-list-company',
  templateUrl: 'list-company.page.html',
  styleUrls: ['list-company.page.scss']
})

export class ListCompanyPage implements OnInit {

  rows = new Array<Company>();

  page = new Page();


  @ViewChild(DatatableComponent) table: DatatableComponent;

  constructor(private companyService: CompanyService,
    private modalController: ModalController,
    public alertController: AlertController,
    public toastController: ToastController) {
    this.page = new Page();
  }

  updateFilter(filter) {
    this.setPage({ offset: 0, filter: filter });
  }

  ngOnInit() {
    this.setPage({ offset: 0, filter: '' });
  }

  setPage(pageInfo) {
    this.page.pageNumber = pageInfo.offset;
    this.page.filter = pageInfo.filter;
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
          this.setPage({ offset: this.table.page, filter: '' });
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
            this.companyService.deleteCompany(company.id).subscribe(
              result => this.showOperationResult(result),
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
      position: 'top',
      closeButtonText: 'Aceptar'
    });
    toast.present();
  }

}
