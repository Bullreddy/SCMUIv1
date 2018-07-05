import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { ApplicationformComponent } from './components/applicationform/applicationform.component';
import { ServicesComponent } from './components/services/services.component';
import { ContactComponent } from './components/contact/contact.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { MatMenuModule, MatButtonModule, MatIconModule, MatCardModule, MatSidenavModule } from '@angular/material';
import { HttpModule,Http } from '@angular/http';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { ServiceApi } from './constant/service.api.constant';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { routing } from './app.routes';
import { ApplayoutComponent } from './components/applayout/applayout.component';
import { DataTableModule } from 'angular5-data-table';
import { SharedModule } from './utils/utils.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { StudentlistComponent } from './components/studentlist/studentlist.component';
import {Interceptor} from './app.interceptor';
import {AuthGuard} from './auth.gaurd';
import {TokenStorage} from './token.storage'
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,ApplicationformComponent,ServicesComponent,
    ContactComponent, ApplayoutComponent, DashboardComponent, StudentlistComponent
   
 ],
  imports: [HttpModule, BrowserModule, FormsModule,routing,BrowserAnimationsModule, NgbModule.forRoot(),HttpClientModule,
     MatMenuModule,DataTableModule,ToastrModule.forRoot({timeOut: 5000,
      positionClass: 'toast-bottom-right', 
      preventDuplicates: true}),ReactiveFormsModule, MatButtonModule, MatIconModule, MatCardModule, MatSidenavModule,SharedModule
   
    
  ],
  providers: [ {provide:HTTP_INTERCEPTORS,useClass:Interceptor,multi:true}
    ,{provide: LocationStrategy, useClass: HashLocationStrategy},
    ServiceApi,TokenStorage,HttpModule,AuthGuard], 
   schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
