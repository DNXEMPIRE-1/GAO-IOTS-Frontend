import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { MatDialog,MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DashboardService } from '../../services/dashboard/dashboard.service';
import { Tag } from 'src/app/model/tag';
import { RfidEntity } from 'src/app/model/rfidEntity.model';
import { RfidLocation } from 'src/app/model/rfidLocation';
import { LocationSelectionComponent } from 'src/app/components/location-selection/location-selection.component';
import { LocationImageDialogComponent } from '../location-image-dialog/location-image-dialog.component';
import { RfidDevice } from 'src/app/model/rfidDevice';
import { RfidDeviceModel } from 'src/app/model/rfidDeviceModel';

@Component({
  selector: 'app-device-dialog',
  templateUrl: './device-dialog.component.html',
  styleUrls: ['./device-dialog.component.css']
})
export class DeviceDialogComponent implements OnInit {

  selectLocation: boolean = false;
  showModelDetails: boolean = false;
  myControl = new FormControl('');
  deviceModels: RfidDeviceModel[];
  filteredOptions: Observable<RfidDeviceModel[]>;
  public showAssignEntity: boolean = false;
  public device : RfidDevice;
  public location: RfidLocation;
  public status: string;
  constructor(
		public dialogRef: MatDialogRef<DeviceDialogComponent>,
		@Inject(MAT_DIALOG_DATA) public data: RfidDevice,
    protected dialog: MatDialog,
    private dashboardService: DashboardService
	) {
      this.device = data;
  }

  ngOnInit(): void {

    if (this.device.locationId != null)
    {
      this.dashboardService.getLocation(this.device.locationId).subscribe(responseData => {
        if (responseData.body)
        {
          this.location = <any>responseData.body;
        }
      })
    }
    this.dashboardService.getRfidDeviceModels().subscribe(responseData => {
      if (responseData.body)
      {
        this.deviceModels = <any>responseData.body;
        this.filteredOptions = this.myControl.valueChanges.pipe(
          startWith(''),
          map(value => this._filter(value || '')),
        );
      }
    })
  }
  onNoClick(): void {
		this.dialogRef.close(false);
	}

	updateDevice() {
    this.status = '';
    this.dashboardService.updateRfidDevice(this.device)
			.subscribe(responseData => {
				if (responseData.body)
        {
           this.dialogRef.close(true);
        }
			},
      error => {
        this.status = error.message;
      });

	}

  onLocationSelected(location: RfidLocation)
  {
    this.location = location;
    this.device.locationId = this.location.id;
  }
  showImage(location:RfidLocation)
  {
    this.status = '';
    let base64: string = null as any;
    if (location.useParentImage && location.useParentImage === true)
    {
      if (location.parentId)
      {
          this.dashboardService.getLocation(location.parentId).subscribe(
            responseData => {
              let parent: RfidLocation = <any> responseData.body;
              if (parent.image && parent.image !== null)
              {
                let imgDialogRef = this.dialog.open(LocationImageDialogComponent , {
                  data: { location: location, parentImage: parent.image,device: this.device}
                });
                const subscribeDialog = imgDialogRef.componentInstance.imagePosition.subscribe((data) => {
                  this.device.locationX = data.x;
                  this.device.locationY = data.y;
                });
             }
             else
                this.status = 'no image found for the parent location';
          }
        )
      }

    }
    else
    {
        let imgDialogRef = this.dialog.open(LocationImageDialogComponent , {

          data: { location: location, device: this.device}
        });
        const subscribeDialog = imgDialogRef.componentInstance.imagePosition.subscribe((data) => {
          this.device.locationX = data.x;
          this.device.locationY = data.y;
        });
    }
  }
  removeLocation()
  {
    this.location = null as any;
    this.device.locationId = null as any;
  }

  private _filter(value: string): RfidDeviceModel[] {
    const filterValue = value.toLowerCase();

    return this.deviceModels.filter(option => option.name.toLowerCase().includes(filterValue));
  }
  getSelected(option: RfidDeviceModel)
  {
    this.device.deviceModel = option;
  }
  removeModel()
  {
    this.device.deviceModel = null as any;
  }
  showModel()
  {
    this.showModelDetails = !this.showModelDetails;
  }
}
