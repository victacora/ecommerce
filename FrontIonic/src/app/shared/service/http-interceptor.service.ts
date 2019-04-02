import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { LoaderProvider } from './loader.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { PagedData } from '../model/paged-data.model';
import { Page } from '../model/page.model';

@Injectable()
export class HttpInterceptor {

  constructor(public http: Http, private loader: LoaderProvider) {

  }

  get(url) {
    this.loader.show();
    return this.http.get(url).pipe(
      map((response => {
        this.loader.hide();
        const result = response.json();
        const pagedData = new PagedData();
        const page = new Page();
        page.totalElements = result.totalElements;
        page.totalPages = result.totalPages;
        page.pageNumber = result.pageNumber;
        pagedData.data = result.data;
        pagedData.page = page;
        return pagedData;
      })));
  }

  post(url, body): Observable<boolean> {
    this.loader.show();
    return this.http.post(url, body).pipe(map(response => {
      this.loader.hide();
      return response.json();
    }));
  }

  put(url, body) {
    this.loader.show();
    return this.http.put(url, body).pipe(map(response => {
      this.loader.hide();
      return response.json();
    }));
  }

  delete(url) {
    this.loader.show();
    return this.http.delete(url).pipe(map(response => {
      this.loader.hide();
      return response.json();
    }));
  }

  patch(url, body) {
    this.loader.show();
    return this.http.patch(url, body).pipe(map(response => {
      this.loader.hide();
      return response.json();
    }));
  }
}
