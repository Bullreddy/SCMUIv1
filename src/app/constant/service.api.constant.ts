import { Injectable } from '@angular/core';

@Injectable()
export class ServiceApi {

	
	private baseURI: string = 'http://localhost:8080/'; // dev url
	//private baseURI: string = 'http://scmdev-env.z4yaiym6f3.us-east-2.elasticbeanstalk.com/'; //prod url
	
	private urlapi = {
		'createapplicationform':'student/saveStudent',
		'getClasficationTypes':'services/rest/classifications/getClassifications',
		'getAllStudents':'student/getStudents',
		'downloadStudent':'student/exportStudents',
		'login':'token/generate-token',
		'getBranches':'services/rest/classification/getBranches',
		'getCertificates':'services/rest/classifications/getCertificates'
	}
	public urlMethod(url: string) {

		return this.baseURI + this.urlapi[url];
	}

}