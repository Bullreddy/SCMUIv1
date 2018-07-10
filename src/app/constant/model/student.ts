export class Student{
    id: number;
    name : string;
    admissionNo : string;
    fatherName : string;
    motherName : string;
    mobileNo : string;
    certificateIds : any[];

    constructor(values: Object[]){
        Object.assign(this,values);
    }
}