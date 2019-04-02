import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PagedData } from '../model/paged-data.model';
import { Company } from '../model/company.model';
import { Page } from '../model/page.model';
import { URLCompany } from '../resources/urls.resource';
import { HttpInterceptor } from './http-interceptor.service';

@Injectable()
export class CompanyService {

    constructor(private http: HttpInterceptor) {
    }

    public getCompanies(page: Page): Observable<PagedData> {
        return this.http.get(`${URLCompany}${page.pageNumber}/${page.size}/${page.filter}`);
    }

    public saveCompany(company: Company): Observable<boolean> {
        return this.http.post(URLCompany, company);
    }

    public updateCompany(company: Company): Observable<boolean> {
        return this.http.put(URLCompany, company);
    }

    public deleteCompany(companyId: String): Observable<boolean> {
        return this.http.delete(`${URLCompany}${companyId}`);
    }
}
