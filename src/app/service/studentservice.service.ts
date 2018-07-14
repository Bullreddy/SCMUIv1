import { Injectable } from '@angular/core';
import { HttpModule } from '@angular/http';
import { ResponseContentType,RequestOptions,Http,Response } from '@angular/http';
import { saveAs } from 'file-saver/FileSaver';
import { Observable } from 'rxjs/Rx';
import { HttpClient,HttpHeaders,HttpParams } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ServiceApi } from '../constant/service.api.constant';
import { map } from 'rxjs/operators/map';

import { catchError } from 'rxjs/operators';

@Injectable()
export class StudentService extends BehaviorSubject<any[]> {

  private _options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  public students :  any;  

  constructor(private http:HttpClient,private serviceApi:ServiceApi) { 
super([])
  }

 
  getStudents (params): Observable<any> {

    return this.http.post(this.serviceApi.urlMethod('getStudents'),JSON.stringify(params),this._options)
  }


saveFile = (blobContent: any, fileName: string) => {
    const blob = new Blob([blobContent], { type: 'application/octet-stream' });
    saveAs(blob, fileName);
};

  downloadFile(params) {
   // const url = this.serviceApi.urlMethod('downloadStudent')+"/"+JSON.stringify(students);
   const url = this.serviceApi.urlMethod('downloadStudent');
    const options = new RequestOptions({responseType: ResponseContentType.Blob });
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'responseType': 'blob'
      })
    }

    const _options = { headers: new HttpHeaders({ 'Content-Type': 'application/json',responseType:'blob' }) };

    this.http.post(url, params,{responseType:'blob'}).subscribe(res => {

        const fileName = "studentlist.xls";
        this.saveFile(res, fileName);
    });
}

}
