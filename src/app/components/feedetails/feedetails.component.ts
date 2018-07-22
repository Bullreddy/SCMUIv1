import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import { DataTableResource } from 'angular5-data-table';
import { FeeDetailService } from '../../service/feedetailService';
import {SharedService} from '../../service/shared';

import { ViewChild } from '@angular/core';
import { DataTable } from 'angular5-data-table';
import { ClassificationService } from '../../service/classificationService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-feedetails',
  templateUrl: './feedetails.component.html',
  styleUrls: ['./feedetails.component.css'],
  providers: [FeeDetailService,ClassificationService]
})
export class FeedetailsComponent implements OnInit {

  @Output() itemId=new EventEmitter();
  itemResource;
  students = [];
  items = [];
  itemCount = 0;
  limits = [10, 20, 40, 80];

  public phases: Array<{name: string, id: number}> = [];
  phase:number;
  academicYear:number;
  trade:number;
  public trades: Array<{name: string, id: number}> = [];
 
  public academicYears: Array<{name: string, id: number}> = [];
  
  public selectedStudents = [];

  @ViewChild(DataTable) studentsable: DataTable;

  constructor(private feeDetailService :FeeDetailService,private classificationService :ClassificationService,private router: Router) {

 }

  ngOnInit(){
      
    this.showStudentList();
   
    this.phases = this.feeDetailService.phases;
 
    this.trades = this.feeDetailService.trades;
  
    this.academicYears = this.feeDetailService.academicYears;
       
    
  }
  

  setFilter(rowEvent){

    this.showStudentList();
  }

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
      this.feeDetailService.getStudentFeeDetails(params)
      .subscribe(heroes => {
    
        this.students = heroes.studentDetails;   
    
      this.itemResource = new DataTableResource(this.students);
      this.reloadItems('');
      this.itemResource.count().then(count => this.itemCount = count);
      }
      );
  }
  // special properties:
  rowClick(rowEvent) {

      console.log('Clicked: ' + rowEvent.row.item.name);
    
  }



  rowDoubleClick(rowEvent) {
  //  console.log('Clicked: ' + rowEvent.row.item.admissionNo);
   // this.router.navigate(['applicationform'],{ queryParams: { admissionNo: rowEvent.row.item.admissionNo} })

  }

  rowTooltip(item) {
    return item.jobTitle;
  }



}
