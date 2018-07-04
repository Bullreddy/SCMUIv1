7.
import { Injectable } from '@angular/core';
import { Headers} from '@angular/http'
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Globals } from './components/globals';

@Injectable()
export class ClassificationService {

  private _options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  public classificationData: string;
  public certificates :  Array<{name: string, id: number}> = []; 
  public trades: Array<{name: string, id: number}> = []; 
  public castes: Array<{name: string, id: number}> = [];
  public phases: Array<{name: string, id: number}> = [];
  public academicYears: Array<{name: string, id: number}> = [];
  public types: Array<{name: string, id: number}> = [];
  public scholarships: Array<{name: string, id: number}> = [];


  constructor(private http:HttpClient,private globals: Globals) {
    this.getClassifications();
    this.getCertificates(null);
  }


  company = [
      'Ford','Chevrolet','Buick'
    ];

  getCertificates(scholarshipType : any){
    console.log("before")
    console.log(this.certificates)
    this.certificates = [];
    if( scholarshipType === "null" || scholarshipType === null){
        scholarshipType = "11"
    }
    console.log("scholarshipType")
    console.log(scholarshipType)
    const params ={
        "scholarshipType": scholarshipType
    }
    this.http.post(this.globals.baseurl+'/services/rest/classifications/getCertificates',
          JSON.stringify(params),this._options).subscribe(res => {
           this.prepareCertificatesData(res);
           console.log(this.certificates)
    });
    console.log("after")
    console.log(this.certificates)
    return this.certificates;
  }  

  getClassifications() {

      const params ={
        "types": [
            "CASTE","PHASE","TRADE","ACADEMIC_YEAR","TYPE","SCHOLARSHIP"
        ]
      }
       this.http.post(this.globals.baseurl+'/services/rest/classifications/getClassifications',
          JSON.stringify(params),this._options).subscribe(res => {
       //this.classificationData = JSON.stringify(res);
       this.prepareUIDropdownData(res);
    });
    return this.classificationData;
  }

  prepareCertificatesData(res){
    res.classifications.forEach(data =>{
      this.certificates.push({ name:data.name, id:data.id})
    })
  }

  prepareUIDropdownData(res){
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


  saveAdmission(user){
       this.http.post(this.globals.baseurl+'/student/saveStudent',user).subscribe(res => {
          console.log(res);
        },
        err => {
          console.log("Error occured"+err);
        }
      );
  }
}