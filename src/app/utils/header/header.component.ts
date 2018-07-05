import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router,Event , NavigationEnd,NavigationStart, NavigationError,ActivatedRouteSnapshot} from '@angular/router';
import { Observable,pipe, observable } from 'rxjs';

import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/switchMap';
import {TokenStorage} from '../../token.storage'
import { ToastrService } from 'ngx-toastr';
/**
* This class represents the toolbar component.
*/
@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
  styleUrls: [],
  providers:[TokenStorage]
})
export class HeaderComponent implements OnInit {
 //public title: string='Dashboard'
	public ngOnInit() {
         this.router.events
        .filter((event) => event instanceof NavigationEnd)
        .map(() => this.getDeepestTitle(this.router.routerState.snapshot.root))
        .subscribe(title=> this.title =title);
      
	}
	constructor(private router: Router,private token:TokenStorage,private toastr:ToastrService) {
        this.title = this.getDeepestTitle(this.router.routerState.snapshot.root)
       
  }

  title: string;
  private logout():void {
  this.token.signOut();
  this.toastr.success('Logout Successfully.', 'Success');
    
  }
  private getDeepestTitle(routeSnapshot: ActivatedRouteSnapshot) {
	
    var title = routeSnapshot.data ? routeSnapshot.data['title'] : '';
 
 
    if (routeSnapshot.firstChild) {
      title = this.getDeepestTitle(routeSnapshot.firstChild) || title;
    }
    return title;
  }
}