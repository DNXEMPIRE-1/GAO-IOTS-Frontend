import { MatDialog } from '@angular/material/dialog';
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import {MatFormFieldModule} from '@angular/material/form-field';
import { Component, Input, OnInit,Output, EventEmitter } from '@angular/core';
import { RfidObject } from 'src/app/model/rfidObject.model';
import { EntityAttribute} from 'src/app/model/entityAttribute.model';
import { OptionValueDialogComponent } from 'src/app/dialogs/option-value-dialog/option-value-dialog.component';
import {RfidobjAttributeDialogComponent} from 'src/app/dialogs/rfidobj-attribute-dialog/rfidobj-attribute-dialog.component'
import { FieldTypes } from 'src/app/constants/fieldtypes.constants';
@Component({
  selector: 'app-rfidobject-form',
  templateUrl: './rfidobject-form.component.html',
  styleUrls: ['./rfidobject-form.component.css']
})
export class RfidobjectFormComponent implements OnInit {

  @Input()
	entity!: RfidObject;

	@Input()
	mobileMode: boolean = false;

	@Input()
	title : string = "";

	@Input()
	saveTitle : string = "Save";

	@Output()
	saver = new EventEmitter();

	@Output()
	discarder = new EventEmitter();


  types: string[] = ['String','Number','Selections','Date', 'Boolean'];

	constructor(
			protected dialog: MatDialog
	) { }

	ngOnInit(): void {

	}

	addField() {
		let item: EntityAttribute = {
			id: '',
			name: "",
			type: "String",
			required: false,
			selections: [],
		};
		this.entity.attributes.push(item);
		return item;
	}

	removeField(item: EntityAttribute) {
		let items = this.entity.attributes;
		let index = items.indexOf(item);
		items.splice(index, 1);
	}

	defineOptions(items: string[]) {
		this.dialog.open(OptionValueDialogComponent, {
			width: '600px',
			data: items
		});
	}

	showCreateFieldDialog() {
		let field: EntityAttribute = this.addField();
		this.dialog.open(RfidobjAttributeDialogComponent, {
			width: '400px',
			data: {field: field, types: this.types}
		});
	}

	selectField(field: EntityAttribute) {
		this.dialog.open(RfidobjAttributeDialogComponent, {
			width: '400px',
			data: {field: field, types: this.types}
		});
	}

}
