import { Inject,Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

@Injectable()
export class ServiceApi {

	constructor(@Inject(DOCUMENT) private document: any) { }
	
	private baseURI: string = 'http://localhost:8080/'; // dev url
	//private baseURI: string = 'http://scmdev-env.z4yaiym6f3.us-east-2.elasticbeanstalk.com/SCMServices/'; //prod url
	//private baseURI: string = 'http://ec2-18-191-230-180.us-east-2.compute.amazonaws.com:8080/SCMServices/'
	
	private urlapi = {
		'createapplicationform':'student/saveStudent',
		'getClasficationTypes':'services/rest/classifications/getClassifications',
		'getapplicationform':'student/getStudentForm',
		'getStudents':'student/getStudents',
		'downloadStudent':'student/exportStudents',
		'login':'token/generate-token',
		'getBranches':'services/rest/classification/getBranches',
		'getCertificates':'services/rest/classifications/getCertificates',
		'getStudent':'student/applyfilter'
	}
	public urlMethod(url: string) {
		console.log('port'+this.document.location.protocol+' host '+this.document.location.hostname)
		return this.baseURI + this.urlapi[url];
	}

}