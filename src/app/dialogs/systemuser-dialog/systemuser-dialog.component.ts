import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, Inject, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { FormControl,ReactiveFormsModule } from '@angular/forms';
import { getMatFormFieldMissingControlError, MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EntityAttribute } from 'src/app/model/entityAttribute.model';
import { RfidEntity } from 'src/app/model/rfidEntity.model';
import { User } from 'src/app/model/user.model';
import { MatSelectModule } from '@angular/material/select';
import { DashboardService } from '../../services/dashboard/dashboard.service';

@Component({
  selector: 'app-systemuser-dialog',
  templateUrl: './systemuser-dialog.component.html',
  styleUrls: ['./systemuser-dialog.component.css']
})
export class SystemuserDialogComponent implements OnInit {

  user!: User;
  message: string;
  confirm_password: string;

  constructor(
		public dialogRef: MatDialogRef<SystemuserDialogComponent>,
		@Inject(MAT_DIALOG_DATA) public data: User,
    private dashboardService: DashboardService
	) {
      this.user = data;
  }

  ngOnInit(): void {
  }
  onNoClick(): void {
		this.dialogRef.close(false);
	}

	updateUser() {
    if (this.checkPassword() == true)
    {
      this.dashboardService.updateUser(this.user)
        .subscribe(responseData => {
          if (responseData.body)
          {
            this.dialogRef.close(true);
          }
        });
    }
	}
  checkPassword() : boolean {
    let rc = true;
    this.message = "";
    if (this.user.password !== undefined) {
      if (this.confirm_password !== this.user.password) {
        this.message = "Password does not match";
        rc = false;
     }
     else
       rc = true;
    }
    return rc;
  }
}
