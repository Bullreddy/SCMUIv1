import { Component, OnInit } from '@angular/core';
import { DataTableResource } from 'angular5-data-table';
import { StudentService } from '../../service/studentservice.service';

@Component({
  selector: 'data-table-demo-1',
  templateUrl: './studentlist.component.html',
  styleUrls: ['./studentlist.component.css'],
  providers: [StudentService]
})
export class StudentlistComponent implements OnInit {

  itemResource;
  students = [];
  items = [];
  itemCount = 0;
  limits = [10, 20, 40, 80];

  constructor(private studentService :StudentService) {
      
  }

  ngOnInit(){
      
    this.showStudentList();
       
    
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
  }

  rowTooltip(item) {
    return item.jobTitle;
  }

  exportStudents(){
      this.studentService.downloadFile()
  }

}
