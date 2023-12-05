import { HttpResponse, HttpClient } from "@angular/common/http";
import { Component, OnInit } from '@angular/core';
import { RfidDeviceModel} from 'src/app/model/rfidDeviceModel';
import { ObjAttribute } from 'src/app/model/attribute.model';
import { Router } from '@angular/router';
import { DashboardService } from '../../services/dashboard/dashboard.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from 'src/app/dialogs/confirmation-dialog/confirmation-dialog.component';
import { DevicemodelDialogComponent } from "src/app/dialogs/devicemodel-dialog/devicemodel-dialog.component";

@Component({
  selector: 'app-device-models',
  templateUrl: './device-models.component.html',
  styleUrls: ['./device-models.component.css']
})
export class DeviceModelsComponent implements OnInit {
  deviceModelList: RfidDeviceModel[];
  constructor(private router: Router, private dashboardService: DashboardService, private dialog: MatDialog) { }
  public topic : string = "default";
  public selectedItem!: RfidDeviceModel;
  public newItem!: RfidDeviceModel;
  status: string;
  ngOnInit(): void {
    this.getItems();
		this.topic = "default";

  }

  onAddRFIDObject() {

  }

  newDeviceModel()
  {

    this.newItem =  {
			id: '',
			name: "",
      attributes: [],
      antennas: [],
      createDate: new Date()
		};
    let dialogRef = this.dialog.open(DevicemodelDialogComponent , {
      width: '800px',
      data: this.newItem
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result == true)
        this.getItems();
    })
	}
  backHome(): void {
		this.router.navigate(['systemSettings']);
	}
  getEntity(item: RfidDeviceModel) {
		this.dashboardService.getRfidDeviceModel(item.id).subscribe(
      responseData => {
        this.selectedItem  =  <any> responseData.body;
      });
	}
  selectItem(item: RfidDeviceModel) {
    this.dashboardService.getRfidDeviceModel(item.id).subscribe(
      responseData => {
        this.selectedItem  =  <any> responseData.body;
        this.topic = "editing";
      });
	}

  removeItem(item: RfidDeviceModel) {
    this.dashboardService.deleteRfidObject(item.id).subscribe(
      responseData => {
        this.getItems();
        });
  }

	getItems()
	{
    this.dashboardService.getRfidDeviceModels().subscribe(
      responseData => {
      this.deviceModelList =  <any> responseData.body;
      this.topic = "default";
      },
      error => {
        this.status = error.message;
      });
	}

  discardUpdate() {
		this.topic = "default";
	}
  editItem(item: RfidDeviceModel)
  {

  }

  create() {
		this.dashboardService.createRfidDeviceModel(this.newItem)
			.subscribe(responseData => {
				if (responseData.body)
          this.getItems();

			});
	}
  updateDeviceModel(deviceModel: RfidDeviceModel)
  {
    let dialogRef = this.dialog.open(DevicemodelDialogComponent , {
      width: '800px',
      data: deviceModel
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result == true)
        this.dashboardService.getRfidDeviceModels().subscribe(
          responseData => {
          this.deviceModelList = <any> responseData.body;
          });
    })
  }
  onDeleteDeviceModel(deviceModel: RfidDeviceModel)
  {
    let dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
      data: 'Are you sure you want to delete the location type ' + deviceModel.name +  '?'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result == true)
        this.deleteDeviceModel(deviceModel);
    })
  }
  deleteDeviceModel(deviceModel: RfidDeviceModel)
  {
    this.dashboardService.getLocationTypes().subscribe(
      responseData => {
        this.dashboardService.deleteRfidDeviceModel(deviceModel.id).subscribe(
          responseData => {
          this.getItems();
          });
      });
  }

}


