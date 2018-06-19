7.
import { Injectable } from '@angular/core';
import { Headers} from '@angular/http'
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Globals } from './components/globals';

@Injectable()
export class ClassificationService {

  private _options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  public classificationData: string;
  public trades: Array<{name: string, id: number}> = []; 
  public castes: Array<{name: string, id: number}> = [];
  public phases: Array<{name: string, id: number}> = [];
  public academicYears: Array<{name: string, id: number}> = [];
  public types: Array<{name: string, id: number}> = [];


  constructor(private http:HttpClient,private globals: Globals) {
    this.getClassifications();
  }


  company = [
      'Ford','Chevrolet','Buick'
    ];

  getClassifications() {

      const params ={
        "types": [
            "CASTE","PHASE","TRADE","ACADEMIC_YEAR","TYPE"
        ]
      }
       this.http.post(this.globals.baseurl+'/services/rest/classifications/getClassifications',
          JSON.stringify(params),this._options).subscribe(res => {
       //this.classificationData = JSON.stringify(res);
       this.prepareUIDropdownData(res);
    });
    return this.classificationData;
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