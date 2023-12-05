import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from "@angular/forms";

@Component({
  selector: 'app-entity-search-form',
  templateUrl: './entity-search-form.component.html',
  styleUrls: ['./entity-search-form.component.css']
})
export class EntitySearchFormComponent implements OnInit {

  range: FormGroup;
  constructor() {
    const today = new Date();
        const day = today.getDate();
		const month = today.getMonth();
		const year = today.getFullYear();

		this.range = new FormGroup({
			start: new FormControl(new Date(year, month, day)),
			end: new FormControl(new Date(year, month, day))
		});
  }

  refresh() {
    try {
        let start: string = this.parseString(this.range.value.start);
        let end: string = this.parseString(this.range.value.end);
        this.doRefresh(start, end);
    } catch (exception: any) {
        let error: Error = exception;
  this.handleError(error);
    }
  }
  parseString(date: Date): string {
    if (date == null)
        throw new Error("Please specify the date range");
    return date.toLocaleString();
  }
  doRefresh(start: string, end: string): void
  {

  }

  handleError(error: Error) : void
  {

  }
  ngOnInit(): void {
  }

}
