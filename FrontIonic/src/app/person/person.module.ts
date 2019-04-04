import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { ListPersonPage } from './list/list-person.page';
import { DialogPersonPage } from './dialog/dialog-person.page';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

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
        component: ListPersonPage
      }
    ])
  ],
  declarations: [ListPersonPage, DialogPersonPage],
  entryComponents: [ListPersonPage, DialogPersonPage]
})
export class PersonModule { }
