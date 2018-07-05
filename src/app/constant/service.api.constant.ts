import { Injectable } from '@angular/core';

@Injectable()
export class ServiceApi {

	
	private baseURI: string = 'http://localhost:8080/';
	
	private urlapi = {
	'createapplicationform':'student/saveStudent',
		'getClasficationTypes':'services/rest/classifications/getClassifications',
		'getAllStudents':'student/getStudents',
		'downloadStudent':'student/exportStudents',
		'login':'token/generate-token',
		
	}
	public urlMethod(url: string) {

		return this.baseURI + this.urlapi[url];
	}

}