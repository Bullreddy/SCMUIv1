import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {TokenStorage} from './token.storage';
import { ToastrService } from 'ngx-toastr';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

    constructor(private router: Router,private token: TokenStorage,private toast:ToastrService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

      if (this.token.getToken() != null) {
            // logged in so return true
            return true;
        }
        console.log(route)
        // not logged in so redirect to login page with the return url
        if(route.routeConfig.path !=="login" ){
          this.toast.error('Session Expired', 'Error');
          this.router.navigate(['/login']);
        }
       // 
        return true;
    }
}