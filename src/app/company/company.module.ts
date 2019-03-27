import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { ListCompanyPage } from './list/list-company.page';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { DialogCompanyPage } from './dialog/dialog-company.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    NgxDatatableModule,
    RouterModule.forChild([
      {
        path: '',
        component: ListCompanyPage
      }
    ])
  ],
  declarations: [ListCompanyPage, DialogCompanyPage],
  entryComponents: [ListCompanyPage, DialogCompanyPage]
})
export class CompanyModule { }
