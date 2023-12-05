import { Component, Input } from '@angular/core';
import { PageConfig } from 'src/app/model/page-config';
import { ViewOption } from 'src/app/model/view-option';

@Component({
	selector: 'display-config',
	templateUrl: './display-config.component.html',
	styleUrls: ['./display-config.component.css']
})
export class DisplayConfigComponent {

	@Input()
	entity!: PageConfig;

	@Input()
	options: ViewOption [] = [];

	constructor() { }

}
