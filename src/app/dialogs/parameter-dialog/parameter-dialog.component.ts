import { Component, OnInit,Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Parameter } from 'src/app/model/parameter';
import { DashboardService } from 'src/app/services/dashboard/dashboard.service';
import { FormControl,ReactiveFormsModule } from '@angular/forms';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';

@Component({
  selector: 'app-parameter-dialog',
  templateUrl: './parameter-dialog.component.html',
  styleUrls: ['./parameter-dialog.component.css']
})
export class ParameterDialogComponent implements OnInit {

  separatorKeysCodes: number[] = [ENTER, COMMA];
  optionCtrl : FormControl = new FormControl();
  public parameter: Parameter;
  message: string;
  constructor(
    private dashboardService: DashboardService,
		public dialogRef: MatDialogRef<ParameterDialogComponent>,
		@Inject(MAT_DIALOG_DATA) public data: Parameter)
    {
      this.parameter = data;
    }

  ngOnInit(): void {
  }
  onNoClick(): void {
    this.message = "";
		this.dialogRef.close(false);
	}

	updateParameter() {
    this.message = "";
    this.dashboardService.updateParameter(this.parameter)
			.subscribe(responseData => {
           this.dialogRef.close(true);
			},
      error => {
        this.message = error.error;
      },);

	}
  removeOption(item: string) {
		let index = this.parameter.values.indexOf(item);
		this.parameter.values.splice(index, 1);
	}
	addOption(event: MatChipInputEvent) {
		let item = event.value;
		this.parameter.values.push(item);
    this.optionCtrl.setValue(null);
	}
}
