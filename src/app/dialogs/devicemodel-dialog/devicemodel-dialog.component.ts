import { Component, OnInit,Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RfidDeviceModel } from 'src/app/model/rfidDeviceModel';
import { DashboardService } from 'src/app/services/dashboard/dashboard.service';
import { FormControl,ReactiveFormsModule } from '@angular/forms';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { EntityAttribute} from 'src/app/model/entityAttribute.model'
import { OptionValueDialogComponent } from 'src/app/dialogs/option-value-dialog/option-value-dialog.component';
import { Antenna } from 'src/app/model/antenna';
import { DeviceDriver } from 'src/app/model/device-driver';
@Component({
  selector: 'app-devicemodel-dialog',
  templateUrl: './devicemodel-dialog.component.html',
  styleUrls: ['./devicemodel-dialog.component.css']
})
export class DevicemodelDialogComponent implements OnInit {

  separatorKeysCodes: number[] = [ENTER, COMMA];
  optionCtrl : FormControl = new FormControl();
  public deviceModel: RfidDeviceModel;
  drivers: DeviceDriver[];
  types: string[] = ['String','Number','Selections','Date', 'Boolean'];
  constructor(
    private dashboardService: DashboardService,
		public dialogRef: MatDialogRef<DevicemodelDialogComponent>,
    public dialog: MatDialog,
		@Inject(MAT_DIALOG_DATA) public data: RfidDeviceModel)
    {
      this.deviceModel = data;
    }

  ngOnInit(): void {
    this.dashboardService.getDeviceDrivers()
			.subscribe(responseData => {
				if (responseData.body)
        {
           this.drivers = <any> responseData.body;
        }
			});
  }
  onNoClick(): void {
		this.dialogRef.close(false);
	}

	updateDeviceModel() {
    this.dashboardService.updateRfidDeviceModel(this.deviceModel)
			.subscribe(responseData => {
				if (responseData.body)
        {
           this.dialogRef.close(true);
        }
			});

	}
  removeAttribute(item: EntityAttribute) {
    if (this.deviceModel.attributes)
    {
		  let index = this.deviceModel.attributes.indexOf(item);
		  this.deviceModel.attributes.splice(index, 1);
    }
	}
  removeAntenna(item: Antenna) {
    if (this.deviceModel.antennas)
    {
		  let index = this.deviceModel.antennas.indexOf(item);
		  this.deviceModel.antennas.splice(index, 1);
    }
	}

  addField() {
		let item: EntityAttribute = {
			id: '',
			name: '',
      value: null as any,
			type: "String",
			required: false,
			selections: [],
		};
    if (this.deviceModel.attributes == null)
      this.deviceModel.attributes = new Array<EntityAttribute>();
		this.deviceModel.attributes.push(item);

		return item;
	}
  removeField(item: EntityAttribute) {
		if (this.deviceModel.attributes)
    {
		  let index = this.deviceModel.attributes.indexOf(item);
      this.deviceModel.attributes.splice(index, 1);
    }
	}
  defineOptions(items: string[]) {
		this.dialog.open(OptionValueDialogComponent, {
			width: '600px',
			data: items
		});
	}

}
