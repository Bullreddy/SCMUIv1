import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormControl} from '@angular/forms';
import { BranchService} from '../../service/branch.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-branch',
  templateUrl: './branch.component.html',
  styleUrls: ['./branch.component.css'],
  providers: [BranchService]
})
export class BranchComponent implements OnInit {

  branchForm: FormGroup;
  branchID: string;
  public branches: Array<{name: string, id: number}> = [];
  constructor(private branchService : BranchService,private router: Router) { }

  ngOnInit() {
   
this.branchForm
    this.branches = this.branchService.branches;
    console.log(this.branches);
    
  }

  public selectBranch(){
    console.log(this.branchID)
    this.branchService.selectBranch(this.branchID);
    this.router.navigate(['dashboard'])
  }
}
