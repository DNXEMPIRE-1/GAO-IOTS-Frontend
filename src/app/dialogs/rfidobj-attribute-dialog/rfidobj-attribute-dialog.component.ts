import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ObjAttribute } from 'src/app/model/attribute.model';


@Component({
  selector: 'app-rfidobj-attribute-dialog',
  templateUrl: './rfidobj-attribute-dialog.component.html',
  styleUrls: ['./rfidobj-attribute-dialog.component.css']
})
export class RfidobjAttributeDialogComponent implements OnInit {

  separatorKeysCodes: number[] = [ENTER, COMMA];
	optionCtrl = new FormControl();
  types: string[] = ['String','Number','Selections','Date', 'Boolean'];
	constructor(
		public dialogRef: MatDialogRef<RfidobjAttributeDialogComponent>,
		@Inject(MAT_DIALOG_DATA) public data: ObjAttribute
	) { }

	ngOnInit(): void {
	}

	onNoClick(): void {
		this.dialogRef.close();
	}

	removeOption(item: string) {
		let index = this.data.selections.indexOf(item);
		this.data.selections.splice(index, 1);
	}
	addOption(event: MatChipInputEvent) {
		this.data.selections.push(event.value);
		this.optionCtrl.setValue(null);
	}

}
