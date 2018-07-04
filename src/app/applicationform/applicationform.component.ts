import { Component, OnInit } from '@angular/core';
import { ClassificationService } from '../classification.service';
import { Student } from '../model/Student';
import { HttpClient } from '@angular/common/http';
import { FormControl,FormGroup,Validators } from '@angular/forms';
import {NgbdDatepickerPopup} from '../components/datepicker'
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { DataTableResource } from 'angular5-data-table';

@Component({
  selector: 'app-applicationform',
  templateUrl: './applicationform.component.html',
  styleUrls: ['./applicationform.component.css']
})
export class ApplicationformComponent implements OnInit {

  itemResource;
  certificates : any;
  admissionForm: FormGroup;
  public company:string[];
  public phases: Array<{name: string, id: number}> = [];
  public castes: Array<{name: string, id: number}> = [];
  public trades: Array<{name: string, id: number}> = [];
  public types: Array<{name: string, id: number}> = [];
  public scholarships: Array<{name: string, id: number}> = [];
  public academicYears: Array<{name: string, id: number}> = [];
  public classificationData:string;
  public student:Student;
  constructor(private classificationService:ClassificationService,private http: HttpClient) { }

  public saveAdmission() {
    this.showValidationErrors();
    if(this.admissionForm.valid) {
        this.student = this.admissionForm.value;
        console.log(this.student);
        this.classificationService.saveAdmission(this.student);

    }
  }

  public showValidationErrors(){
    this.admissionForm.controls['name'].markAsTouched()
    this.admissionForm.controls['admissionNo'].markAsTouched()
    this.admissionForm.controls['mobileNo'].markAsTouched()
    this.admissionForm.controls['fatherName'].markAsTouched()
    this.admissionForm.controls['tradeID'].markAsTouched()
    this.admissionForm.controls['casteID'].markAsTouched()
    this.admissionForm.controls['phaseID'].markAsTouched()
    this.admissionForm.controls['address'].markAsTouched()
    this.admissionForm.controls['typeID'].markAsTouched()
    this.admissionForm.controls['regNo'].markAsTouched()
    this.admissionForm.controls['mailID'].markAsTouched()
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
      mobileNo:new FormControl('', [Validators.required]),
      fatherName:new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
      tradeID: new FormControl('', Validators.required),
      casteID: new FormControl('', Validators.required),
      phaseID: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      typeID: new FormControl('', Validators.required),
      regNo: new FormControl('', Validators.required),
      mailID: new FormControl(),
      motherName: new FormControl(),
      alternateMobileNo: new FormControl(),
      aadharNo: new FormControl(),
      dob: new FormControl('', Validators.required),
      category: new FormControl('', Validators.required),
      academicYearID: new FormControl('', Validators.required),
      scholarship: new FormControl('', Validators.required)
    })

    this.phases = this.classificationService.phases;
    this.castes = this.classificationService.castes;
    this.trades = this.classificationService.trades;
    this.types = this.classificationService.types;
    this.academicYears = this.classificationService.academicYears;
    this.scholarships = this.classificationService.scholarships;

    this.certificates = this.classificationService.certificates;
    console.log(this.certificates)
    this.itemResource = new DataTableResource(this.certificates);

  }

  public loadCertificates(scholarshipType: any){
    this.certificates = null;
    console.log(this.certificates)
    this.certificates = this.classificationService.getCertificates(scholarshipType);
    console.log(this.certificates)
    this.itemResource = new DataTableResource(this.certificates);

  }

  rowClick(rowEvent) {
    console.log('Clicked: ' + rowEvent.row.item.id);
  }

}
