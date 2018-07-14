import { Injectable } from '@angular/core';
import { HttpModule } from '@angular/http';
import { ResponseContentType,RequestOptions,Http,Response } from '@angular/http';
import { HttpClient,HttpHeaders,HttpParams } from '@angular/common/http';
import { ServiceApi } from '../constant/service.api.constant';
import { TokenStorage} from '../token.storage';

@Injectable()
export class ClassificationService{


  private _options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

  public trades: Array<{name: string, id: number}> = []; 
  public castes: Array<{name: string, id: number}> = [];
  public phases: Array<{name: string, id: number}> = [];
  public academicYears: Array<{name: string, id: number}> = [];
  public types: Array<{name: string, id: number}> = [];
  public scholarships: Array<{name: string, id: number}> = [];
  public branchID : string;
  constructor(private http:HttpClient,private serviceApi:ServiceApi,private token: TokenStorage) { 
        
        this.branchID = this.token.getItem("BranchID");
        console.log(this.branchID)
        this.getClassifications()
  }

  private getClassifications() {
   
    const params ={
      "types": [
          "CASTE","PHASE","TRADE","ACADEMIC_YEAR","TYPE","SCHOLARSHIP"
      ],
      "branchID":this.branchID
    }
     this.http.post(this.serviceApi.urlMethod('getClasficationTypes'),
        JSON.stringify(params),this._options).subscribe(res => {
     //this.classificationData = JSON.stringify(res);
     this.prepareUIDropdownData(res);
  });
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

}
