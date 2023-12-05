import { Component, Output, EventEmitter, Input, OnInit, ViewChild } from '@angular/core';
import { EntityAttribute } from 'src/app/model/entityAttribute.model';
import { MatTable } from '@angular/material/table';

@Component({
  selector: 'app-rfidobject-attributes-form',
  templateUrl: './rfidobject-attributes-form.component.html',
  styleUrls: ['./rfidobject-attributes-form.component.css']
})
export class RfidobjectAttributesFormComponent implements OnInit {

  ngOnInit(): void {

	}

  @Input()
	attributes: EntityAttribute [] = [];

	@Input()
	types: string[] = [];

	@Output()
	creator = new EventEmitter();

	@Output()
	remover = new EventEmitter<EntityAttribute>();

	@Output()
	defineOptions = new EventEmitter<string []>();

	columns: string[] = ["name", "type", "required", "selections", "remove"];

	@ViewChild(MatTable, { static: true })
	table!: MatTable<any>;

	addField() {
		this.creator.emit();
		this.table.renderRows();
	}

	removeField(item: EntityAttribute) {
		this.remover.emit(item);
		this.table.renderRows();
	}


}
