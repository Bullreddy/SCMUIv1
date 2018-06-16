import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ResponseContentType,RequestOptions,Http,Response } from '@angular/http';
import { saveAs } from 'file-saver/FileSaver';

@Injectable()
export class StudentService {

  public students :  any;  

  constructor(private http:Http,private httpClient:HttpClient) { 

  }

  getStudents() {
     this.httpClient.get('http://localhost:8080/student/getStudents')
                        .subscribe(res => {
     this.students = res;
  });
  return this.students;
  }

  exportStudents() {
    alert("exportstudnets")
  /*  this.http.get('http://localhost:8080/student/exportStudents',{
      responseType: ResponseContentType.Blob
    }).map()
                       .subscribe(data => {
                         console.log(data)
                        var blob = new Blob([data], {
                          type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
                      });
                      FileSaver.saveAs(blob, 'File_Name_With_Some_Unique_Id_Time' + '.xlsx');
  });*/
  return this.downloadFile();
  }

saveFile = (blobContent: Blob, fileName: string) => {
    const blob = new Blob([blobContent], { type: 'application/octet-stream' });
    console.log(blob)
    console.log(fileName)
    saveAs(blob, fileName);
};

  downloadFile() {
    const url = `http://localhost:8080/student/exportStudents`;
    const options = new RequestOptions({responseType: ResponseContentType.Blob });

    this.http.get(url, options).subscribe(res => {
      console.log(res)
        const fileName = "studentlist.xls";
        this.saveFile(res.blob(), fileName);
    });
}

}
