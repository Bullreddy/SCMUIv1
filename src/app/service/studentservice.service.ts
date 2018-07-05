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


  public students :  any;  

  constructor(private http:HttpClient,private serviceApi:ServiceApi) { 
super([])
  }

 
  getStudents (): Observable<any> {
    return this.http.get(this.serviceApi.urlMethod('getAllStudents'))
  }
  exportStudents() {

  return this.downloadFile();
  }

saveFile = (blobContent: Blob, fileName: string) => {
    const blob = new Blob([blobContent], { type: 'application/octet-stream' });
    console.log(blob)
    console.log(fileName)
    saveAs(blob, fileName);
};

  downloadFile() {
    const url = this.serviceApi.urlMethod('downloadStudent');
    
    const options = new RequestOptions({responseType: ResponseContentType.Blob });

    this.http.get(url, {responseType:'blob'}).subscribe(res => {
      console.log(res)
        const fileName = "studentlist.xls";
        console.log(res)
        this.saveFile(res, fileName);
    });
}

}
