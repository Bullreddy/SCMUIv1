import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class StudentService {

  public students :  any;  

  constructor(private http:HttpClient) { 
    this.getStudents();
  }

  getStudents() {
     this.http.get('http://localhost:8080/student/getStudents')
                        .subscribe(res => {
     this.students = res;
     //console.log(this.students)
  });
  return this.students;
}

}
