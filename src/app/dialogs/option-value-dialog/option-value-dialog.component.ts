import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormControl,ReactiveFormsModule } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-option-value-dialog',
  templateUrl: './option-value-dialog.component.html',
  styleUrls: ['./option-value-dialog.component.css']
})
export class OptionValueDialogComponent implements OnInit {

  separatorKeysCodes: number[] = [ENTER, COMMA];
  optionCtrl : FormControl = new FormControl();

	constructor(
		public dialogRef: MatDialogRef<OptionValueDialogComponent>,
		@Inject(MAT_DIALOG_DATA) public data: string[]
	) { }

	ngOnInit(): void {

	}

	onNoClick(): void {
		this.dialogRef.close();
	}
	removeOption(item: string) {
		let index = this.data.indexOf(item);
		this.data.splice(index, 1);
	}
	addOption(event: MatChipInputEvent) {
		let item = event.value;
		this.data.push(item);
    this.optionCtrl.setValue(null);
	}

}
