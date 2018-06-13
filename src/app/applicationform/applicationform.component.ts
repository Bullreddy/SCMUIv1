import { Component, OnInit } from '@angular/core';
import { ClassificationService } from '../classification.service';
import { Student } from '../model/Student';
import { HttpClient } from '@angular/common/http';
import { FormControl,FormGroup,Validators } from '@angular/forms';

@Component({
  selector: 'app-applicationform',
  templateUrl: './applicationform.component.html',
  styleUrls: ['./applicationform.component.css']
})
export class ApplicationformComponent implements OnInit {


  admissionForm: FormGroup;
  public company:string[];
  public phases: Array<{name: string, id: number}> = [];
  public castes: Array<{name: string, id: number}> = [];
  public trades: Array<{name: string, id: number}> = [];
  public types: Array<{name: string, id: number}> = [];
  public academicYears: Array<{name: string, id: number}> = [];
  public classificationData:string;
  public student:Student;
  constructor(private classificationService:ClassificationService,private http: HttpClient) { }

  public saveAdmission() {
    if(this.admissionForm.valid) {
        this.student = this.admissionForm.value;
        console.log(this.student);
        this.classificationService.saveAdmission(this.student);

    }
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
      address: new FormControl('', Validators.required),
      typeID: new FormControl('', Validators.required),
      regNo: new FormControl('', Validators.required),
      mailID: new FormControl(),
      motherName: new FormControl(),
      alternateMobileNo: new FormControl(),
      aadharNo: new FormControl(),
      dob: new FormControl('', Validators.required),
      category: new FormControl('', Validators.required),
      academicYearID: new FormControl('', Validators.required)
    })

    this.phases = this.classificationService.phases;
    this.castes = this.classificationService.castes;
    this.trades = this.classificationService.trades;
    this.types = this.classificationService.types;
    this.academicYears = this.classificationService.academicYears;

  }

}