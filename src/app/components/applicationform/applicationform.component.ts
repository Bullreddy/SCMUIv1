import { Component,ViewChild , OnInit } from '@angular/core';
import { Validators, FormGroup, FormControl, FormBuilder ,FormsModule, ReactiveFormsModule } from '@angular/forms';
import {ApplicationformService} from '../../service/applicationform.service';
import { Student } from '../../constant/model/Student';
import { DataTable,DataTableResource } from 'angular5-data-table';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-applicationform',
  templateUrl: './applicationform.component.html',
  styleUrls: ['./applicationform.component.css'],
  providers: [ApplicationformService]
})
export class ApplicationformComponent implements OnInit {

  admissionForm: FormGroup;
  certificates : Array<{name: string, id: number,selected:boolean}> = [];;
  itemResource;

  public company:string[];
  public phases: Array<{name: string, id: number}> = [];
  public castes: Array<{name: string, id: number}> = [];
  public trades: Array<{name: string, id: number}> = [];
  public types: Array<{name: string, id: number}> = [];
  public academicYears: Array<{name: string, id: number}> = [];
  public scholarships: Array<{name: string, id: number}> = [];
  public selectedCertificates = [];
  public classificationData:string;
  public  btnState:string ="create";
  public student:Student;
  public paramAdmissionNo :string;


  @ViewChild(DataTable) certificatesTable: DataTable;


  constructor(private classificationService:ApplicationformService,fb:FormBuilder,private toast:ToastrService,    private route: ActivatedRoute,
    private router: Router) { 


  }
  
 public focusOutFunction(){
   let val=this.admissionForm.controls.admissionNo.value;
   if(this.paramAdmissionNo!=null){
    this.admissionForm.patchValue({
      admissionNo:this.paramAdmissionNo
     });
    }

      console.log(this.admissionForm.value)
   if(val!=null ) {
       this.classificationService.getFormByNumber(this.admissionForm.value).subscribe(res => {
          if(res!=null){
            this.admissionForm.patchValue(res)
            this.btnState="Update";
            this.selectedCertificates = res['certificateIds']
            this.loadCertificates(this.admissionForm.value.scholarship)
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

    this.student = this.admissionForm.value;
    this.student.certificateIds = this.selectedCertificates;
    console.log(this.certificatesTable.selectedRows)

    this.showValidationErrors();
    this.selectedCertificates = [];
    this.certificatesTable.rows.forEach(data =>{
      if(data.item.selected)
      this.selectedCertificates.push(data.item.id) 
    })
    console.log(this.selectedCertificates)
    if(this.admissionForm.valid) {
        this.student = this.admissionForm.value;
        this.student.certificateIds = this.selectedCertificates;
        this.classificationService.saveAdmission(this.student);

        this.classificationService.saveAdmission(this.student).subscribe(res => {


        this.admissionForm.patchValue(res)

        this.toast.success('Application Form saved Successfully.', 'Success');
        this.btnState="Update";

       })
    }
  }
  public resetForm(){
    this.btnState="Create";
    this.admissionForm.reset();
    this.admissionForm.patchValue({});
    this.selectedCertificates = [];
    this.loadCertificates(null)
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
      regNo: new FormControl(),
      mailID: new FormControl(),
      email: new FormControl(),
      motherName: new FormControl(),
      alternateMobileNo: new FormControl(),
      aadharNo: new FormControl(),
      id:new FormControl(),
      dob: new FormControl('', Validators.required),
      category: new FormControl(),
      academicYearID: new FormControl('', Validators.required),
      scholarship: new FormControl('', Validators.required),
      identificationMarks: new FormControl()
    })

    this.phases = this.classificationService.phases;
    this.castes = this.classificationService.castes;
    this.trades = this.classificationService.trades;
    this.types = this.classificationService.types;
    this.academicYears = this.classificationService.academicYears;
    this.scholarships = this.classificationService.scholarships;

    this.route
      .queryParams
      .subscribe(params => {
        console.log(this.admissionForm.controls.admissionNo.value)
        console.log(params['admissionNo']);
        this.paramAdmissionNo = params['admissionNo']
        if(this.paramAdmissionNo)
            this.focusOutFunction()
      });
  }


  public loadCertificates(scholarshipType: any){
    this.certificates = [];
    if(scholarshipType!=null){
      this.classificationService.getCertificates(scholarshipType).subscribe(res => {
        this.prepareCertificatesData(res);
        console.log(this.selectedCertificates)
        console.log(this.certificates)
      });
    }

  }

  prepareCertificatesData(res){
    res.classifications.forEach(data =>{
      if(this.selectedCertificates){
            console.log(this.selectedCertificates.includes(data.id))
            console.log(data.id)
            this.certificates.push({ name:data.name, id:data.id,selected:this.selectedCertificates.includes(data.id)})
    }
  })
}

  rowClick(rowEvent) {
    console.log('Clicked: ' + rowEvent.row.item.id);
    console.log('Clicked: ' + rowEvent.row.item.selected );
    rowEvent.row.item.selected = !rowEvent.row.item.selected ;
  }

}
