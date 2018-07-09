
import { Injectable } from '@angular/core';
import { Http, Headers, Response, URLSearchParams, RequestOptions, RequestOptionsArgs } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ServiceApi } from '../constant/service.api.constant';
import { TokenStorage} from '../token.storage';
import { map } from 'rxjs/operators/map';

@Injectable()
export class BranchService extends BehaviorSubject<any[]> {


  private _options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
 

  public branches: Array<{name: string, id: number}> = []; 
 

  constructor(private http: HttpClient, private serviceApi: ServiceApi,private token:TokenStorage) {
    super([])
  
    this.getBranches();
  }


  private getBranches() {
    const params ={
        "types": [
            "BRANCH"
        ]
      }
       this.http.post(this.serviceApi.urlMethod('getClasficationTypes'),
          JSON.stringify(params),this._options).subscribe(res => {
       this.prepareUIDropdownData(res);
       console.log(this.branches)
    });
  }

  private prepareUIDropdownData(res){
    res.classifications.forEach(data => {
        this.branches.push({ name: data.name, id: data.id })
    })    
  }
    private getHeader() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return headers;
    }

    public selectBranch(branchID : string){
        this.token.setItem("BranchID",branchID)
    }
}
