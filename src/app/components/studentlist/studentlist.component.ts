import { Component, OnInit } from '@angular/core';
import { DataTableResource } from 'angular5-data-table';
import { StudentService } from '../../service/studentservice.service';
import { ClassificationService } from '../../service/classificationService';

@Component({
  selector: 'data-table-demo-1',
  templateUrl: './studentlist.component.html',
  styleUrls: ['./studentlist.component.css'],
  providers: [StudentService,ClassificationService]
})
export class StudentlistComponent implements OnInit {

  itemResource;
  students = [];
  items = [];
  itemCount = 0;
  limits = [10, 20, 40, 80];
  phase;
  trade;
  academicYear;

  public phases: Array<{name: string, id: number}> = [];
  public trades: Array<{name: string, id: number}> = [];
  public academicYears: Array<{name: string, id: number}> = [];


  constructor(private studentService :StudentService,private classificationService :ClassificationService) {

  }

  ngOnInit(){
      
    this.phases = this.classificationService.phases;
    this.trades = this.classificationService.trades;
    this.academicYears = this.classificationService.academicYears;
    console.log(this.phases)
    this.showStudentList();
       
    
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
      console.log('Clicked: ' + rowEvent.row.item.name);
  }

  rowDoubleClick(rowEvent) {
      alert('Double clicked: ' + rowEvent.row.item.name);
  }

  rowTooltip(item) {
    return item.jobTitle;
  }

  exportStudents(){
      this.studentService.downloadFile()
  }

}
