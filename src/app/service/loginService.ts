import { Injectable,EventEmitter ,Output} from '@angular/core';

import { ResponseContentType,RequestOptions,Http,Response } from '@angular/http';
import { saveAs } from 'file-saver/FileSaver';
import { Observable } from 'rxjs/Rx';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ServiceApi } from '../constant/service.api.constant';
import { map } from 'rxjs/operators/map';

import { catchError } from 'rxjs/operators';

@Injectable()
export class LoginService extends BehaviorSubject<any[]> {

  
 
  constructor(private http:HttpClient,private serviceApi:ServiceApi) { 
super([])


  }
  attemptAuth(ussername: string, password: string): Observable<any> {
    const credentials = {username: ussername, password: password};
    console.log('attempAuth ::');
    
    return this.http.post(this.serviceApi.urlMethod('login'), credentials);
  }

}
