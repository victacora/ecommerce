import { Injectable } from '@angular/core';
import { Company } from '../model/company.model';
import { Person } from '../model/person.model';
import { Storage } from '@ionic/storage';

const ACTIVATE_COMPANY = 'activate_company';
const USER = 'user';

@Injectable()
export class SessionService {

  constructor(private storage: Storage) {

  }

  getActivateCompany() {
    return this.storage.get(ACTIVATE_COMPANY);
  }

  setActivateCompany(company: Company) {
    this.storage.set(ACTIVATE_COMPANY, JSON.stringify(company));
  }

  removeActivateCompany() {
    this.storage.remove(ACTIVATE_COMPANY);
  }

  getUser() {
    return this.storage.get(USER);
  }

  setUser(user: Person) {
    this.storage.set(USER, JSON.stringify(user));
  }

  removeUser() {
    this.storage.remove(USER);
  }


}
