import { Component, OnInit, ViewChild } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { Page } from 'src/app/shared/model/page.model';
import { ModalController, AlertController, ToastController } from '@ionic/angular';

import { isBoolean } from 'util';
import { DialogPersonPage } from '../dialog/dialog-person.page';
import { Person } from 'src/app/shared/model/person.model';
import { PersonService } from 'src/app/shared/service/person.service';
import { SessionService } from 'src/app/shared/service/session.service';
import { Company } from 'src/app/shared/model/company.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-person',
  templateUrl: 'list-person.page.html',
  styleUrls: ['list-person.page.scss']
})

export class ListPersonPage {

  rows = new Array<Person>();

  page = new Page();

  filter = '';

  company: Company;

  @ViewChild(DatatableComponent) table: DatatableComponent;

  constructor(private personService: PersonService,
    private modalController: ModalController,
    public alertController: AlertController,
    public toastController: ToastController,
    public sessionService: SessionService,
    private router: Router) {
    this.page = new Page();
    this.sessionService.getActivateCompany().then(
      result => {
        this.company = JSON.parse(result);
        if (!this.company) {
          this.showCompanySelectionError();
          this.router.navigate(['company']);
        } else {
          this.setPage({ offset: 0, filter: '-' });
        }
      });
  }

  updateFilter() {
    this.setPage({ offset: 0, filter: (this.filter === '' ? '-' : this.filter) });
  }

  clearFilter() {
    this.filter = '';
    this.setPage({ offset: 0, filter: '-' });
  }

  setPage(pageInfo) {
    if (this.company) {
      this.page.pageNumber = pageInfo.offset;
      this.page.filter = !pageInfo.filter ? '-' : pageInfo.filter;
      this.personService.getPersons(this.page, this.company._id).subscribe(pagedData => {
        this.page = pagedData.page;
        this.rows = pagedData.data;
      });
    }
  }

  async edit(person) {
    const modal = await this.modalController.create({
      component: DialogPersonPage,
      componentProps: { person: person }
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

  async delete(person) {
    const alert = await this.alertController.create({
      header: 'Advertencia',
      message: '¿Está seguro de realizar la eliminación del registro seleccionado?',
      buttons: [
        'Cancelar', {
          text: 'Aceptar',
          handler: _ => {
            this.personService.deletePerson(person._id, this.company._id).subscribe(
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

  async showCompanySelectionError() {
    const toast = await this.toastController.create({
      message: 'Debe seleccionar una empresa como activa para gestionar personas',
      showCloseButton: true,
      duration: 1500,
      position: 'top',
      closeButtonText: 'Aceptar'
    });
    toast.present();
  }

  async create() {
    const modal = await this.modalController.create({
      component: DialogPersonPage
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

}
