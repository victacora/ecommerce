import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PagedData } from '../model/paged-data.model';
import { Company } from '../model/company.model';
import { Page } from '../model/page.model';
import { Http } from '@angular/http';
import { URLCompany } from '../resources/urls.resource';

@Injectable()
export class CompanyService {

    constructor(private http: Http) {
    }

    public getCompanies(page: Page): Observable<PagedData<Company>> {
        return this.http.get('assets/data/company.json').pipe(map(data => this.getPagedData(data.json(), page)));
    }

    public saveCompany(company: Company): Observable<boolean> {
        return this.http.post(URLCompany, company).pipe(map(response => response.json()));
    }

    public deleteCompany(companyId: number): Observable<boolean> {
        return this.http.delete(`${URLCompany}${companyId}`).pipe(map(response => response.json()));
    }

    private getPagedData(companyData: any, page: Page): PagedData<Company> {
        const pagedData = new PagedData<Company>();
        page.totalElements = companyData.length;
        page.totalPages = page.totalElements / page.size;
        const start = page.pageNumber * page.size;
        const end = Math.min((start + page.size), page.totalElements);
        for (let i = start; i < end; i++) {
            const company = new Company();
            company.name = companyData[i].name;
            company.gender = companyData[i].gender;
            company.company = companyData[i].company;
            company.age = companyData[i].age;
            pagedData.data.push(company);
        }
        pagedData.page = page;
        return pagedData;
    }

}
