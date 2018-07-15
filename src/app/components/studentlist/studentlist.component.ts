<<<<<<< HEAD
import { Component, OnInit ,Output, EventEmitter} from '@angular/core';
import { DataTableResource } from 'angular5-data-table';
import { StudentService } from '../../service/studentservice.service';
import {SharedService} from '../../service/shared';
=======
import { Component,ViewChild, OnInit } from '@angular/core';
import { DataTable, DataTableResource } from 'angular5-data-table';
import { StudentService } from '../../service/studentservice.service';
import { ClassificationService } from '../../service/classificationService';
import { Router } from '@angular/router';
>>>>>>> ae546be19b96e5009e39d73d854fc5b67d284624

import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'data-table-demo-1',
  templateUrl: './studentlist.component.html',
  styleUrls: ['./studentlist.component.css'],
  providers: [StudentService,ClassificationService]
})
export class StudentlistComponent implements OnInit {
  @Output() itemId=new EventEmitter();
  itemResource;
  students = [];
  items = [];
  itemCount = 0;
  limits = [10, 20, 40, 80];
<<<<<<< HEAD
  public phases: Array<{name: string, id: number}> = [];
  phase:number=0;
  academicYear:number=0;
  trade:number=0;
  public trades: Array<{name: string, id: number}> = [];
 
  public academicYears: Array<{name: string, id: number}> = [];
  constructor(private studentService :StudentService,private sharedService:SharedService,private router:Router) {
      
=======
  phase;
  trade;
  academicYear;

  public phases: Array<{name: string, id: number}> = [];
  public trades: Array<{name: string, id: number}> = [];
  public academicYears: Array<{name: string, id: number}> = [];
  public selectedStudents = [];

  @ViewChild(DataTable) studentsable: DataTable;

  constructor(private studentService :StudentService,private classificationService :ClassificationService,private router: Router) {

>>>>>>> ae546be19b96e5009e39d73d854fc5b67d284624
  }

  ngOnInit(){
      
    this.phases = this.classificationService.phases;
    this.trades = this.classificationService.trades;
    this.academicYears = this.classificationService.academicYears;
    console.log(this.phases)
    this.showStudentList();
   
    this.phases = this.studentService.phases;
 
    this.trades = this.studentService.trades;
  
    this.academicYears = this.studentService.academicYears;
       
    
  }
  setFilter(e){
   
    console.log(this.phase+".."+this.academicYear+".."+this.trade);
    
    let data={
      phase:this.phase,
      academicYearID:this.academicYear,
      trade:this.trade
    }

<<<<<<< HEAD
data=JSON.parse(JSON.stringify(data));
   this.studentService.getStudentByFilter(data).subscribe(data => {
     
     //this.students=new Array(data);
     console.log(data)
      this.itemResource = new DataTableResource(data);
       
        console.log(this.itemResource)
        this.reloadItems('');
        this.itemResource.count().then(count => this.itemCount = count);
    })
    
  }
=======
  setFilter(rowEvent){

    this.showStudentList();
  }

>>>>>>> ae546be19b96e5009e39d73d854fc5b67d284624
  reloadItems(params) {
   // console.log( this.itemResource)
    if(this.itemResource!=undefined)
      this.itemResource.query(params).then(items => this.items = items);
  }
  showStudentList(): void {
    const branchID = this.classificationService.branchID
    const params = {
      "phaseID" : this.phase,
      "tradeID" : this.trade,
      "academicYearID" : this.academicYear,
      "branchID" :branchID
    }
    this.studentService.getStudents(params)
      .subscribe(heroes => {
          this.students = heroes;   
     
      
        this.itemResource = new DataTableResource(this.students);
        this.reloadItems('');
        this.itemResource.count().then(count => this.itemCount = count);
       
      }
      );
  }
  // special properties:
  rowClick(rowEvent) {
<<<<<<< HEAD
      console.log('Clicked: ' + rowEvent.row.item.name);
    
  }

  rowDoubleClick(rowEvent) {
      alert('Double clicked: ' + rowEvent.row.item.name);
     
      this.router.navigate(['applicationform']) 
      this.sharedService.setItemValue(rowEvent.row.item.id);
=======
      console.log('Clicked: ' + rowEvent.row.item.admissionNo);
     // this.router.navigate(['applicationform'],{ queryParams: { admissionNo: rowEvent.row.item.admissionNo} })
  }

  rowDoubleClick(rowEvent) {
    console.log('Clicked: ' + rowEvent.row.item.admissionNo);
    this.router.navigate(['applicationform'],{ queryParams: { admissionNo: rowEvent.row.item.admissionNo} })
>>>>>>> ae546be19b96e5009e39d73d854fc5b67d284624

  }

  rowTooltip(item) {
    return item.jobTitle;
  }

  exportStudents(){
    this.studentsable.selectedRows.forEach(row =>{
      this.selectedStudents.push(row.item.id)
    })
    const params = {
      "phaseID" : this.phase,
      "tradeID" : this.trade,
      "academicYearID" : this.academicYear,
      "branchID" :this.classificationService.branchID,
      "students" : this.selectedStudents
    }
   

    this.studentService.downloadFile(params)
  }

}
