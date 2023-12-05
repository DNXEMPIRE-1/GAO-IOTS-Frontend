import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { MatDialog,MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DashboardService } from '../../services/dashboard/dashboard.service';
import { RfidDeviceModel } from 'src/app/model/rfidDeviceModel';
import { Antenna } from 'src/app/model/antenna';
import { RfidDevice } from 'src/app/model/rfidDevice';

@Component({
  selector: 'app-antenna-dialog',
  templateUrl: './antenna-dialog.component.html',
  styleUrls: ['./antenna-dialog.component.css']
})
export class AntennaDialogComponent implements OnInit {

  selectLocation: boolean = false;
  myControl = new FormControl('');
  public showAssignEntity: boolean = false;
  public device: RfidDevice;
  constructor(
		public dialogRef: MatDialogRef<AntennaDialogComponent>,
		@Inject(MAT_DIALOG_DATA) public data: {device: RfidDevice},
    protected dialog: MatDialog,
    private dashboardService: DashboardService
	) {
      this.device = data.device;
  }

  ngOnInit(): void {

  }
  onNoClick(): void {
		this.dialogRef.close(false);
	}

	updateAntenna() {

	}

}
