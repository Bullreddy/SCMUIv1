import { Component, OnInit ,Output, EventEmitter} from '@angular/core';
import { DataTableResource } from 'angular5-data-table';
import { StudentService } from '../../service/studentservice.service';
import {SharedService} from '../../service/shared';

import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'data-table-demo-1',
  templateUrl: './studentlist.component.html',
  styleUrls: ['./studentlist.component.css'],
  providers: [StudentService]
})
export class StudentlistComponent implements OnInit {
  @Output() itemId=new EventEmitter();
  itemResource;
  students = [];
  items = [];
  itemCount = 0;
  limits = [10, 20, 40, 80];
  public phases: Array<{name: string, id: number}> = [];
  phase:number=0;
  academicYear:number=0;
  trade:number=0;
  public trades: Array<{name: string, id: number}> = [];
 
  public academicYears: Array<{name: string, id: number}> = [];
  constructor(private studentService :StudentService,private sharedService:SharedService,private router:Router) {
      
  }

  ngOnInit(){
      
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
  reloadItems(params) {
   // console.log( this.itemResource)
    if(this.itemResource!=undefined)
      this.itemResource.query(params).then(items => this.items = items);
      console.log(this.itemResource)
  }
  showStudentList(): void {
    this.studentService.getStudents()
      .subscribe(heroes => {
          this.students = heroes;
        console.log(this.students);
         
     
      
        this.itemResource = new DataTableResource(this.students);
       
        console.log(this.itemResource)
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
      this.sharedService.setItemValue(rowEvent.row.item.id);
      this.router.navigate(['applicationform']) 

  }

  rowTooltip(item) {
    return item.jobTitle;
  }

  exportStudents(){
      this.studentService.downloadFile()
  }

}
