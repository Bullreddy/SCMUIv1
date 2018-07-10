import { Injectable,EventEmitter,Output } from '@angular/core';
import {HttpInterceptor, HttpRequest, HttpHandler, HttpSentEvent, HttpHeaderResponse, HttpProgressEvent,
  HttpResponse, HttpUserEvent, HttpErrorResponse} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import {TokenStorage} from './token.storage';
import { ToastrService } from 'ngx-toastr';
import {AppComponent} from './app.component';
import 'rxjs/add/operator/do';

const TOKEN_HEADER_KEY = 'Authorization';

@Injectable()
export class Interceptor implements HttpInterceptor {
 
  
  
  constructor(private token: TokenStorage, private router: Router,private toast:ToastrService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpUserEvent<any>> {

      let authReq = req;
    if (this.token.getToken() != null) {
      console.log('s')
      authReq = req.clone({
        setHeaders:{

'Authorization':`Bearer ${this.token.getToken()}`
        }
      
         //headers: req.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + this.token.getToken())
        });
    }
    console.log(authReq)
   
        return next.handle(authReq).do(
          (event: any) => {
            if (event instanceof HttpResponse) {
              
            }
          },
          (err: any) => {
            if (err instanceof HttpErrorResponse) {
              //alert('err')
              
               if (err.status == 401) {
                // alert('issue in interpter');
                this.toast.error('Session Expired', 'Error');
                
                 this.router.navigate(['login']);
               }
             }
    
          }
          );
     
  }

}

