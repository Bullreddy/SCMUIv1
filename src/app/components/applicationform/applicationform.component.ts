import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormControl, FormBuilder ,FormsModule, ReactiveFormsModule } from '@angular/forms';
import {ApplicationformService} from '../../service/applicationform.service';
import { Student } from '../../constant/model/Student';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-applicationform',
  templateUrl: './applicationform.component.html',
  styleUrls: ['./applicationform.component.css'],
  providers: [ApplicationformService]
})
export class ApplicationformComponent implements OnInit {
  
  public admissionForm: FormGroup;
  public company:string[];
  public phases: Array<{name: string, id: number}> = [];
  public castes: Array<{name: string, id: number}> = [];
  public trades: Array<{name: string, id: number}> = [];
  public types: Array<{name: string, id: number}> = [];
  public academicYears: Array<{name: string, id: number}> = [];
  public classificationData:string;
  public  btnState:string ="create";
  public student:Student;
  constructor(private classificationService:ApplicationformService,fb:FormBuilder,private toast:ToastrService) { 

  }
 public focusOutFunction(){
   let val=this.admissionForm.controls.admissionNo.value;
   
    
   if(val!=null ) {

console.log(val)
  this.classificationService.getFormByNumber(this.admissionForm.value).subscribe(res => {
if(res!=null){
  
    console.log(res);
    this.admissionForm.patchValue(res)

    console.log(this.admissionForm.value)
   this.btnState="Update";
}else{
  this.resetForm();
  this.admissionForm.patchValue({
    admissionNo:val
  });
}
   })
  }
 }
  public saveAdmission() {

    console.log(this.admissionForm)
    this.showValidationErrors();
    if(this.admissionForm.valid) {
        this.student = this.admissionForm.value;
        console.log(this.student);
      this.classificationService.saveAdmission(this.student).subscribe(res => {

        console.log(res);
        this.admissionForm.patchValue(res)

        console.log(this.admissionForm.value)
        this.toast.success('Application Form saved Successfully.', 'Success');
  this.btnState="Update";
       // this.admissionForm.value=res;
         //this.classificationData = JSON.stringify(res);
       })
      

    }
  }
  public resetForm(){
    this.btnState="Create";
    this.admissionForm.reset();
    this.admissionForm.patchValue({});

  }

  public showValidationErrors(){
    this.admissionForm.controls['name'].markAsTouched()
    this.admissionForm.controls['admissionNo'].markAsTouched()
    this.admissionForm.controls['mobileNo'].markAsTouched()
    this.admissionForm.controls['fatherName'].markAsTouched()
    this.admissionForm.controls['tradeID'].markAsTouched()
    this.admissionForm.controls['casteID'].markAsTouched()
    this.admissionForm.controls['phaseID'].markAsTouched()
    this.admissionForm.controls['presentAddress'].markAsTouched()
    this.admissionForm.controls['typeID'].markAsTouched()
    this.admissionForm.controls['regNo'].markAsTouched()
    this.admissionForm.controls['email'].markAsTouched()
    this.admissionForm.controls['motherName'].markAsTouched()
    this.admissionForm.controls['alternateMobileNo'].markAsTouched()
    this.admissionForm.controls['aadharNo'].markAsTouched()
    this.admissionForm.controls['dob'].markAsTouched()
    this.admissionForm.controls['category'].markAsTouched()
    this.admissionForm.controls['academicYearID'].markAsTouched()
  }

  ngOnInit() {
    this.admissionForm = new FormGroup({
      admissionNo: new FormControl('', Validators.required),
      mobileNo:new FormControl('', Validators.required),
      fatherName:new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
      tradeID: new FormControl('', Validators.required),
      casteID: new FormControl('', Validators.required),
      phaseID: new FormControl('', Validators.required),
      presentAddress: new FormControl('', Validators.required),
      typeID: new FormControl('', Validators.required),
      regNo: new FormControl('', Validators.required),
      email: new FormControl(),
      motherName: new FormControl(),
      alternateMobileNo: new FormControl(),
      aadharNo: new FormControl(),
      id:new FormControl(),
      dob: new FormControl('', Validators.required),
      category: new FormControl(),
      academicYearID: new FormControl('', Validators.required)
    })

    this.phases = this.classificationService.phases;
    this.castes = this.classificationService.castes;
    this.trades = this.classificationService.trades;
    this.types = this.classificationService.types;
    this.academicYears = this.classificationService.academicYears;

  }

}
