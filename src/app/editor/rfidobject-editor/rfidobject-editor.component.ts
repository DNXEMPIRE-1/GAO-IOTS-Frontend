import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { RfidObject } from 'src/app/model/rfidObject.model';

@Component({
  selector: 'app-rfidobject-editor',
  templateUrl: './rfidobject-editor.component.html',
  styleUrls: ['./rfidobject-editor.component.css']
})
export class RfidobjectEditorComponent implements OnInit {

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

	constructor() { }

  ngOnInit(): void {
  }

}
