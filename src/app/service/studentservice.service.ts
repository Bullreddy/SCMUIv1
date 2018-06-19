import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ResponseContentType,RequestOptions,Http,Response } from '@angular/http';
import { saveAs } from 'file-saver/FileSaver';
import { Globals } from '../components/globals';

@Injectable()
export class StudentService {

  public students :  any;  

  constructor(private http:Http,private httpClient:HttpClient,private globals:Globals) { 

  }

  getStudents() {
     this.httpClient.get(this.globals.baseurl+'/student/getStudents')
                        .subscribe(res => {
     this.students = res;
  });
  return this.students;
  }

  exportStudents() {

  return this.downloadFile();
  }

saveFile = (blobContent: Blob, fileName: string) => {
    const blob = new Blob([blobContent], { type: 'application/octet-stream' });
    console.log(blob)
    console.log(fileName)
    saveAs(blob, fileName);
};

  downloadFile() {
    const url = this.globals.baseurl+`/student/exportStudents`;
    const options = new RequestOptions({responseType: ResponseContentType.Blob });

    this.http.get(url, options).subscribe(res => {
      console.log(res)
        const fileName = "studentlist.xls";
        this.saveFile(res.blob(), fileName);
    });
}

}
