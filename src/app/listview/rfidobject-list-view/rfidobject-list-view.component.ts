import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { RfidObject } from 'src/app/model/rfidObject.model';

@Component({
  selector: 'app-rfidobject-list-view',
  templateUrl: './rfidobject-list-view.component.html',
  styleUrls: ['./rfidobject-list-view.component.css']
})
export class RfidobjectListViewComponent implements OnInit {

  @Input()
	items: RfidObject [] = [];

	@Output()
	selector = new EventEmitter<RfidObject>();

	@Output()
	remover = new EventEmitter<RfidObject>();

	constructor() { }

  ngOnInit(): void {
  }

}
