export class Student{
    id: number;
    name : string;
    admissionNo : string;
    fatherName : string;
    motherName : string;
    mobileNo : string;

    constructor(values: Object[]){
        Object.assign(this,values);
    }
}