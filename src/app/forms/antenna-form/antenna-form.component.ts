import { Component, OnInit, Input, Output,EventEmitter, ViewChild} from '@angular/core';
import { Antenna } from 'src/app/model/antenna';
import { MatTableDataSource } from '@angular/material/table';
import { DashboardService } from 'src/app/services/dashboard/dashboard.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AntennaDialogComponent } from 'src/app/dialogs/antenna-dialog/antenna-dialog.component';
import { RfidDeviceModel } from 'src/app/model/rfidDeviceModel';
import { MatTable } from '@angular/material/table';
import { DataSharingService } from 'src/app/services/data-sharing.service';
import { RfidDevice } from 'src/app/model/rfidDevice';
import { LocationImageDialogComponent } from 'src/app/dialogs/location-image-dialog/location-image-dialog.component';
import { RfidLocation } from 'src/app/model/rfidLocation';

@Component({
  selector: 'app-antenna-form',
  templateUrl: './antenna-form.component.html',
  styleUrls: ['./antenna-form.component.css']
})
export class AntennaFormComponent implements OnInit {

  imgDialogRef : MatDialogRef<LocationImageDialogComponent>;
  columns: string[] = [
    'status',
    'control',
    'port',
    'transmitPower',
    'sensitivity',
    'location',
    'action'
  ];


  dataSource:  MatTableDataSource<any>;

  @Input()
	deviceModel: RfidDeviceModel;
  @Input()
  device: RfidDevice;

  @Input()
  deviceConfiguration: boolean = false;

  @Output()
	creator = new EventEmitter();

  @Output()
	remover = new EventEmitter<Antenna>();

  selectedAntenna: Antenna;
  constructor(private dashboardService: DashboardService,protected dialog: MatDialog,
              private dataSharing: DataSharingService) { }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.deviceModel.antennas);
  }
  addAntenna() {

    if (this.deviceModel.antennas == null)
      this.deviceModel.antennas = new Array<Antenna>();
    let antenna : Antenna = {
      uuid:'',
      isEnabled: true,
      locationId:'',
      controlType: 0,
      gopPort: -1,
      transmitPower: 30,
      sensitivity: -70
    }
		this.deviceModel.antennas.push(antenna);
    this.dataSource.connect().next(this.deviceModel.antennas);
	}
  removeAntenna(antenna: Antenna)
  {
    let index = this.deviceModel.antennas.indexOf(antenna);
    if (index >= 0)
    {
      this.deviceModel.antennas.splice(index,1);
      this.dataSource.connect().next(this.deviceModel.antennas);
    }
  }
  updateAntenna(antenna:Antenna)
  {
    let dialogRef = this.dialog.open(AntennaDialogComponent , {
      width: '600px',
      data: antenna
    });
    dialogRef.afterClosed().subscribe(result => {

    })
  }
  showLocationImage(location: RfidLocation, antenna:Antenna)
  {
    let name = location.name;
    let sub_title = "[" + this.device.name + ":Antenna:" + antenna.gopPort + "]";
    this.imgDialogRef = this.dialog.open(LocationImageDialogComponent , {
          data: { location: location, antenna:antenna, sub_title: sub_title} });
    const subscribeDialog = this.imgDialogRef.componentInstance.imagePosition.subscribe((data) => {
      antenna.locationX = data.x;
      antenna.locationY = data.y;
      this.dashboardService.updateRfidDevice(this.device).subscribe();
    });
  }
  showLocationWithParentImage(location: RfidLocation, antenna:Antenna)
  {
    let name = location.name;
    let sub_title = "[" + this.device.name + ":Antenna:" + antenna.gopPort + "]";
    if (location.parentId)
      {
          this.dashboardService.getLocation(location.parentId).subscribe(
            responseData => {
              let parent: RfidLocation = <any> responseData.body;
              this.imgDialogRef = this.dialog.open(LocationImageDialogComponent , {
                data: { location: location, parentImage: parent.image}
              });
            const subscribeDialog = this.imgDialogRef.componentInstance.imagePosition.subscribe((data) => {
            antenna.locationX = data.x;
            antenna.locationY = data.y;
            this.dashboardService.updateRfidDevice(this.device).subscribe();
          });
          }
        )
      }
  }
  showLocation(locationId: string, antenna: Antenna)
  {
    this.dashboardService.getLocation(locationId).subscribe(responseData=>
    {
        let location = <any> responseData.body;
        if (location.useParentImage && location.useParentImage === true)
        {
          this.showLocationWithParentImage(location, antenna);
        }
        else
          this.showLocationImage(location, antenna);
    });


  }
  removeLocation(antenna: Antenna)
  {
    antenna.locationId = '';
  }
  allowDrop(event: Event)
  {
    event.preventDefault();
  }
  drop(event: Event, antenna: Antenna) {
    event.preventDefault();
    if (this.dataSharing.selectedLocation != null)
    {
        antenna.locationId = this.dataSharing.selectedLocation.id;
        this.dashboardService.updateRfidDevice(this.device).subscribe(result => {

        });
    }
  }

}
