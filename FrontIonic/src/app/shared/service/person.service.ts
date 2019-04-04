import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PagedData } from '../model/paged-data.model';
import { Page } from '../model/page.model';
import { URLPerson } from '../resources/urls.resource';
import { HttpInterceptor } from './http-interceptor.service';
import { Person } from '../model/person.model';

@Injectable()
export class PersonService {

    constructor(private http: HttpInterceptor) {
    }

    public getPersons(page: Page, companyId: String): Observable<PagedData> {
        return this.http.get(`${URLPerson}${page.pageNumber}/${page.size}/${page.filter}/${companyId}`);
    }

    public savePerson(person: Person, companyId: String): Observable<boolean> {
        return this.http.post(URLPerson, { person: person, id_company: companyId });
    }

    public updatePerson(person: Person, companyId: String): Observable<boolean> {
        return this.http.put(URLPerson, { person: person, id_company: companyId });
    }

    public deletePerson(id: String, companyId: String): Observable<boolean> {
        return this.http.delete(`${URLPerson}${id}/${companyId}`);
    }
}
