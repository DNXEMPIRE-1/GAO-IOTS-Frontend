import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import {Observable} from 'rxjs';
import {map, refCount, startWith} from 'rxjs/operators';
import { MatDialog,MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DashboardService } from '../../services/dashboard/dashboard.service';
import { Emailuser } from 'src/app/model/emailuser';
import { validateHorizontalPosition } from '@angular/cdk/overlay';

@Component({
  selector: 'app-emailuser-dialog',
  templateUrl: './emailuser-dialog.component.html',
  styleUrls: ['./emailuser-dialog.component.css']
})
export class EmailuserDialogComponent implements OnInit {


  myControl = new FormControl('');
  public emailuser : Emailuser;
  public emailpattern: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  constructor(
		public dialogRef: MatDialogRef<EmailuserDialogComponent>,
		@Inject(MAT_DIALOG_DATA) public data: Emailuser,
    protected dialog: MatDialog,
    private dashboardService: DashboardService
	) {
      this.emailuser = data;
  }

  ngOnInit(): void {

  }
  onNoClick(): void {
		this.dialogRef.close(false);
	}

  validateEmailuser() : boolean
  {
    let rc: boolean = false;
    if (this.emailuser.firstname.length >0 && this.emailuser.lastname.length > 0 &&
        this.emailpattern.test(this.emailuser.email))
        rc = true;
    return rc;
  }
	updateEmailuser() {
    if (this.validateEmailuser())
    {
    this.dashboardService.updateEmailuser(this.emailuser)
			.subscribe(responseData => {
				if (responseData.body)
        {
           this.dialogRef.close(true);
        }
			});
    }
	}
}
