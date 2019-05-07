import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalController, NavParams, ToastController } from '@ionic/angular';
import { PersonService } from 'src/app/shared/service/person.service';
import { Person } from 'src/app/shared/model/person.model';
import { TYPE_DOCUMENTS } from 'src/app/shared/resources/type-documents.resource';
import { TYPE_USERS } from 'src/app/shared/resources/type-users.resource';
import { JsonPipe } from '@angular/common';
import { toUnicode } from 'punycode';
import { Company } from 'src/app/shared/model/company.model';
import { SessionService } from 'src/app/shared/service/session.service';

@Component({
  selector: 'app-dialog-person',
  templateUrl: 'dialog-person.page.html',
  styleUrls: ['dialog-person.page.scss']
})

export class DialogPersonPage {

  private personForm: FormGroup;
  private person: Person;
  typeDocuments = new Array();
  typeUsers = new Array();
  typeUsersSelection = new Array();
  company: Company;

  constructor(
    private personService: PersonService,
    formBuilder: FormBuilder,
    navParams: NavParams,
    public sessionService: SessionService,
    public toastController: ToastController,
    private modalCtrl: ModalController) {
    this.person = navParams.get('person');
    this.sessionService.getActivateCompany().then(
      result => {
        this.company = JSON.parse(result);
      });
    this.personForm = formBuilder.group({
      name: [(this.person ? this.person.name : ''), Validators.required],
      surname: [(this.person ? this.person.surname : ''), Validators.required],
      typeDocument: [(this.person ? this.person.typeDocument : ''), Validators.required],
      dni: [(this.person ? this.person.dni : ''), Validators.required],
      email: [(this.person ? this.person.email : ''), Validators.required],
      phone: [(this.person ? this.person.phone : '')],
      movil: [(this.person ? this.person.movil : ''), Validators.required],
      street: [(this.person ? this.person.street : ''), Validators.required],
      typeUser: [false]
    });
    TYPE_DOCUMENTS.forEach(t => this.typeDocuments.push(t));
    TYPE_USERS.forEach(t => this.typeUsers.push(t));
    if (this.person && this.person.typeUser) {
      this.person.typeUser.forEach(t => {
        this.typeUsersSelection.push({ key: t });
      });
    }
  }

  save() {
    if (this.typeUsersSelection && this.typeUsersSelection.length > 0) {

      if (this.person) {
        this.personService.updatePerson(this.getPerson(this.personForm), this.company._id).subscribe(
          result => this.modalCtrl.dismiss(true),
          error => this.modalCtrl.dismiss(false),
        );
      } else {
        this.personService.savePerson(this.getPerson(this.personForm), this.company._id).subscribe(
          result => this.modalCtrl.dismiss(true),
          error => this.modalCtrl.dismiss(false),
        );
      }
    } else {
      this.showErrorMessage();
    }
  }

  async showErrorMessage() {
    const toast = await this.toastController.create({
      message: 'Seleccione un al menos un tipo de usuario',
      showCloseButton: true,
      duration: 1500,
      position: 'top',
      closeButtonText: 'Aceptar'
    });
    toast.present();
  }

  getPerson(personForm: FormGroup) {
    this.person = this.person ? this.person : new Person();
    this.person._id = this.person ? this.person._id : '';
    this.person.name = personForm.value.name;
    this.person.surname = personForm.value.surname;
    this.person.typeDocument = personForm.value.typeDocument;
    this.person.dni = personForm.value.dni;
    this.person.phone = personForm.value.phone;
    this.person.movil = personForm.value.movil;
    this.person.street = personForm.value.street;
    this.person.email = personForm.value.email;
    this.person.typeUser = new Array();
    this.typeUsersSelection.forEach(t => {
      this.person.typeUser.push(t.key);
    });
    return this.person;
  }

  close() {
    this.modalCtrl.dismiss();
  }

  isSelectTypeUser(typeUserKey: string) {
    return this.typeUsersSelection.some(tu => tu.key === typeUserKey);
  }

  selectTypeUser(typeUser: any, event: any) {
    if (event.currentTarget.checked) {
      if (!this.typeUsersSelection.some(tu => tu.key === typeUser.key)) {
        this.typeUsersSelection.push(typeUser);
      }
    } else {
      const positionElement = this.typeUsersSelection.findIndex(tu => tu.key === typeUser.key);
      if (positionElement !== -1) {
        this.typeUsersSelection.splice(positionElement, 1);
      }
    }
  }
}


