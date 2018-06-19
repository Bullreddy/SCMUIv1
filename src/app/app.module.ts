import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { ApplicationformComponent } from './applicationform/applicationform.component';
import { RouterModule } from '@angular/router';
import { ClassificationService } from './classification.service'
import { StudentService } from './service/studentservice.service'
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';
import { StudentlistComponent } from './studentlist/studentlist.component';
import { NgbdDatepickerPopup } from './components/datepicker';
import { DataTableModule } from 'angular5-data-table';
import { DlDateTimePickerDateModule } from 'angular-bootstrap-datetimepicker';
import { FormsModule } from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { Globals } from './components/globals';


@NgModule({
  declarations: [
    AppComponent,ApplicationformComponent, StudentlistComponent,NgbdDatepickerPopup
  ],
  imports: [
    BrowserModule,
    HttpClientModule,HttpModule,DlDateTimePickerDateModule,
    ReactiveFormsModule,DataTableModule,FormsModule,NgbModule.forRoot(),
    RouterModule.forRoot([
      {
        path: 'applicationform',
        component: ApplicationformComponent
      },
      {
        path: 'studentlist',
        component: StudentlistComponent
      }
    ])
  ],
  providers: [ClassificationService,StudentService,NgbdDatepickerPopup,Globals],
  bootstrap: [AppComponent]
})
export class AppModule { }
