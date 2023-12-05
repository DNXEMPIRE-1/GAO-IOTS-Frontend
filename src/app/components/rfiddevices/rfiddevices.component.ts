import { Component, OnInit,Output,EventEmitter, AfterViewInit } from '@angular/core';
import { Tag } from 'src/app/model/tag';
import { RfidDevice } from 'src/app/model/rfidDevice';
import { DashboardService } from '../../services/dashboard/dashboard.service';
import { MatDialog } from '@angular/material/dialog';
import { DeviceDialogComponent } from 'src/app/dialogs/device-dialog/device-dialog.component';
import { ConfirmationDialogComponent } from 'src/app/dialogs/confirmation-dialog/confirmation-dialog.component';
import { MatTableDataSource } from '@angular/material/table';
import { AntennaDialogComponent } from 'src/app/dialogs/antenna-dialog/antenna-dialog.component';

@Component({
  selector: 'app-rfiddevices',
  templateUrl: './rfiddevices.component.html',
  styleUrls: ['./rfiddevices.component.css']
})
export class RfidDevicesComponent implements OnInit, AfterViewInit {

  @Output() backClick = new EventEmitter();
  columns: string[] = [
    'name',
    'model',
    'antenna',
    'ipAddress',
    'fqdn',
    'status',
    'controlType',
    'action'
  ];

  deviceList: RfidDevice[] = [];
  status : string = '';
  panelName = 'device';
  selectedDevice: RfidDevice;

  dataSource?:  MatTableDataSource<any>;
  constructor(private dashboardService: DashboardService,protected dialog: MatDialog) { }

  ngOnInit(): void {

    this.getDevices();
  }
  ngAfterViewInit(): void {

  }
  createDevice()
  {
    let device: RfidDevice = {
      id: '',
      name: '',
      macAddress: '',
      ipAddress:'',
      fqdn:'',
      createDate: new Date(),
    };


    let dialogRef = this.dialog.open(DeviceDialogComponent , {
      width: '600px',
      data: device
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result == true)
        this.getDevices();
    })
  }
  updateStatus()
  {

  }
  updateDevice(device:RfidDevice)
  {
    let dialogRef = this.dialog.open(DeviceDialogComponent , {
      width: '800px',
      data: device
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result == true)
        this.getDevices();
    })
  }
  showTestPanel(device:RfidDevice)
  {
    this.selectedDevice = device;
    this.panelName = 'testdevice';
  }
  configAntenna(device:RfidDevice)
  {
    this.panelName = 'antenna';

    this.selectedDevice = device;
  }
  onDeleteDevice(device: RfidDevice)
  {
    let dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: 'Are you sure you want to delete?'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result == true)
        this.deleteDevice(device);
    })
  }

  getDevices()
	{

    this.dashboardService.getRfidDevices().subscribe(
      responseData => {
      this.deviceList =  <any> responseData.body;
      this.dataSource = new MatTableDataSource(this.deviceList);
      this.getDevicesStatus(this.deviceList);
      },
      error => {
        this.status = error.message;
      },);


	}
  getDevicesStatus(devices: RfidDevice[])
  {
    for (let device of devices)
    {
      this.dashboardService.getRfidDeviceStatus(device.id).subscribe(
        responseData => {
          device.status =  <any> responseData.body;
        });
    }
  }
  deleteDevice(device: RfidDevice)
  {
    this.dashboardService.deleteRfidDevice(device.id).subscribe(
      result => {
      this.getDevices();
      });
  }
  backHome()
  {
    this.backClick.emit();
  }
}

