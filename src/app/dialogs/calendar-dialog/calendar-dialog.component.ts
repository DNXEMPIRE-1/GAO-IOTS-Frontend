import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { MatDialog,MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DashboardService } from '../../services/dashboard/dashboard.service';
import { RfidDeviceModel } from 'src/app/model/rfidDeviceModel';

@Component({
  selector: 'app-calendar-dialog',
  templateUrl: './calendar-dialog.component.html',
  styleUrls: ['./calendar-dialog.component.css']
})
export class CalendarDialogComponent implements OnInit {

  selectLocation: boolean = false;
  myControl = new FormControl('');
  startDate: Date;
  endDate: Date;
  constructor(
		public dialogRef: MatDialogRef<CalendarDialogComponent>,
    protected dialog: MatDialog,
    private dashboardService: DashboardService
	  ) {

    }

  ngOnInit(): void {

  }
  onNoClick(): void {
		this.dialogRef.close(false);
	}

  onApply()
  {

  }

}

