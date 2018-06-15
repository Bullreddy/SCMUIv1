import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { ApplicationformComponent } from './applicationform/applicationform.component';
import { RouterModule } from '@angular/router';
import { ClassificationService } from './classification.service'
import { StudentService } from './service/studentservice.service'
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { StudentlistComponent } from './studentlist/studentlist.component';
import { DataTableModule } from 'angular5-data-table';


@NgModule({
  declarations: [
    AppComponent,ApplicationformComponent, StudentlistComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,DataTableModule,
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
  providers: [ClassificationService,StudentService],
  bootstrap: [AppComponent]
})
export class AppModule { }
