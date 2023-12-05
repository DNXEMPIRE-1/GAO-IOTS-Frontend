import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-report-from',
  templateUrl: './report-from.component.html',
  styleUrls: ['./report-from.component.css']
})
export class ReportFromComponent implements OnInit {

  @Input()
	range!: FormGroup;
  constructor() { }

  ngOnInit(): void {
  }

  @Output()
	refresh = new EventEmitter();

	@Output()
	pdf = new EventEmitter();

	@Output()
	csv = new EventEmitter();


}
