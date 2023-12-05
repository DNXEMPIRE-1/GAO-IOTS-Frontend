import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { RfidObject } from 'src/app/model/rfidObject.model';

@Component({
  selector: 'app-rfidobject-list-view2',
  templateUrl: './rfidobject-list-view2.component.html',
  styleUrls: ['./rfidobject-list-view2.component.css']
})
export class RfidobjectListView2Component implements OnInit {

  rfidObject? : RfidObject;
  @Input()
	items: RfidObject [] = [];

   constructor() { }

  ngOnInit(): void {
  }

  getItemId(index : number, item : RfidObject) {
    return item.id;
  }
}
