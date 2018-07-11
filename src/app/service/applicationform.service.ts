
import { Injectable } from '@angular/core';
import { Http, Headers, Response, URLSearchParams, RequestOptions, RequestOptionsArgs } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { HttpClient,HttpHeaders,HttpParams} from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ServiceApi } from '../constant/service.api.constant';
import { map } from 'rxjs/operators/map';
import { ToastrService } from 'ngx-toastr';
import { TokenStorage} from '../token.storage';

@Injectable()
export class ApplicationformService extends BehaviorSubject<any[]> {


  private _options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
 
  certificates : any;
  public classificationData: string;
  public trades: Array<{name: string, id: number}> = []; 
  public castes: Array<{name: string, id: number}> = [];
  public phases: Array<{name: string, id: number}> = [];
  public academicYears: Array<{name: string, id: number}> = [];
  public types: Array<{name: string, id: number}> = [];
  public scholarships: Array<{name: string, id: number}> = [];

  constructor(private http: HttpClient, private serviceApi: ServiceApi,private toast: ToastrService,private token: TokenStorage) {
    super([])
  
    this.getClassifications();
    console.log(this.token.getItem("BranchID"))
  }


  company = [
      'Ford','Chevrolet','Buick'
    ];

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
       //this.classificationData = JSON.stringify(res);
       this.prepareUIDropdownData(res);
    });
    return this.classificationData;
  }

  getCertificates(scholarshipType : any){

    this.certificates = [];
    if( scholarshipType === "null" || scholarshipType === null){
        scholarshipType = "11"
    }

    const params ={
        "scholarshipType": scholarshipType,
        "types": [
         "SCHOLARSHIP"
      ],
    }
    this.http.post(this.serviceApi.urlMethod('getCertificates'),
          JSON.stringify(params),this._options).subscribe(res => {
           this.prepareCertificatesData(res);
           console.log(this.certificates)
    });
    return this.certificates;
  }  


  prepareCertificatesData(res){
    res.classifications.forEach(data =>{
      this.certificates.push({ name:data.name, id:data.id})
    })
  }

  private prepareUIDropdownData(res){
    res.classifications.forEach(data => {
        let type = data.type;
        if(type === "CASTE")
          this.castes.push({ name: data.name, id: data.id })
        else if(type === "PHASE")
          this.phases.push({ name: data.name, id: data.id })
        else if(type === "TRADE")
          this.trades.push({ name: data.name, id: data.id })
        else if(type === "ACADEMIC_YEAR")
          this.academicYears.push({ name: data.name, id: data.id })
        else if(type === "TYPE")
          this.types.push({ name: data.name, id: data.id })
        else if(type ==="SCHOLARSHIP")
          this.scholarships.push({ name: data.name, id: data.id })
    })    
  }


  public getFormByNumber (data:any){
    let params = new HttpParams();
    params = params.append('admissionNo',data.number);
    return this.http.put(this.serviceApi.urlMethod('getapplicationform'),data,this._options)
    
    
  }
  public saveAdmission (data:any){
    console.log(this.serviceApi.urlMethod('createapplicationform'))
    console.log(data)
    return this.http.post(this.serviceApi.urlMethod('createapplicationform'),data,this._options);

}
private getHeader() {
  let headers = new Headers();
  headers.append('Content-Type', 'application/json');
  return headers;
}
}
