7.
import { Injectable } from '@angular/core';
import { Headers} from '@angular/http'
import { HttpClient,HttpHeaders } from '@angular/common/http';

@Injectable()
export class ClassificationService {

  private _options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  public classificationData: string;
  public trades: Array<{name: string, id: number}> = []; 
  public castes: Array<{name: string, id: number}> = [];
  public phases: Array<{name: string, id: number}> = [];
  public academicYears: Array<{name: string, id: number}> = [];
  public types: Array<{name: string, id: number}> = [];


  constructor(private http:HttpClient) {
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
       this.http.post('http://localhost:8080/services/rest/classifications/getClassifications',
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
       this.http.post('http://localhost:8080/student/saveStudent',user).subscribe(res => {
          console.log(res);
        },
        err => {
          console.log("Error occured"+err);
        }
      );
  }
}