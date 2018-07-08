import { Component, OnInit,OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from '../../service/loginService';
import {TokenStorage} from '../../token.storage';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginService]

})
export class LoginComponent implements OnInit {
   model: any={};
  constructor(private router: Router,private authService:LoginService,private token:TokenStorage,private toast: ToastrService) { 

   
  }

   //Add the class to body tag when the View is initialized
   ngOnInit() {
    let body = document.getElementsByTagName('body')[0];
    body.classList.add("login-page");
  
}
public preventDefault(event: Event) {
  event.preventDefault();
}

public submitForm(){
  
  this.authService.attemptAuth(this.model.username, this.model.password).subscribe(
    data => {
      if(data==null){
        
        this.toast.error('Authentication Failed.', 'Error');
      
      }else{
        this.token.saveToken(data.token);
        this.toast.success('Login Successfully.', 'Success');
       this.router.navigate(['branch']) 
      }
     // 
      console.log(data);
     
      //this.router.navigate(['user']);
    }
  );
  console.log(this.model.username)
  //this.router.navigateByUrl('dashboard')
 
}
//Remove the class from body tag when the View is destroyed
ngOnDestroy() {
    let body = document.getElementsByTagName('body')[0];
    body.classList.remove("login-page");
}
}
