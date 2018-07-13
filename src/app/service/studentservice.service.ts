import { Injectable } from '@angular/core';
import { HttpModule } from '@angular/http';
import { ResponseContentType,RequestOptions,Http,Response } from '@angular/http';
import { saveAs } from 'file-saver/FileSaver';
import { Observable } from 'rxjs/Rx';
import { HttpClient,HttpHeaders,HttpParams } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ServiceApi } from '../constant/service.api.constant';
import { map } from 'rxjs/operators/map';
import {TokenStorage} from '../token.storage';

import { catchError } from 'rxjs/operators';

@Injectable()
export class StudentService extends BehaviorSubject<any[]> {


  private _options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  public trades: Array<{name: string, id: number}> = []; 
  public phases: Array<{name: string, id: number}> = [];
  public academicYears: Array<{name: string, id: number}> = [];
  public students :  any;  

  constructor(private http:HttpClient,private serviceApi:ServiceApi,private token: TokenStorage) { 
super([])
this.getClassifications();
  }

  getStudentByFilter (data:any): Observable<any> {
   
    let params = new HttpParams();
    params=params.set('phase',data.phase);
    params=params.set('trade',data.trade);
    params=params.set('year',data.academicYearID);
    return this.http.get(this.serviceApi.urlMethod('getStudent'),{params:params});
    
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
private getClassifications() {
  const branchID = this.token.getItem("BranchID");
  const params ={
    "types": [
        "CASTE","PHASE","TRADE","ACADEMIC_YEAR","TYPE","SCHOLARSHIP"
    ],
    "branchID":branchID
  }
   this.http.post(this.serviceApi.urlMethod('getClasficationTypes'),
      JSON.stringify(params),this._options).subscribe(res => {
        this.loadDropdowns(res);
        
  
});

}
loadDropdowns(res){
  this.phases.push({name:"All",id:0});
  this.trades.push({name:"All",id:0});
  this.academicYears.push({name:"All",id:0});
  res.classifications.forEach(data => {
    let type = data.type;
    if(type === "PHASE")
      this.phases.push({ name: data.name, id: data.id })
    else if(type === "TRADE")
      this.trades.push({ name: data.name, id: data.id })
    else if(type === "ACADEMIC_YEAR")
      this.academicYears.push({ name: data.name, id: data.id })
  
}) 
}
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
