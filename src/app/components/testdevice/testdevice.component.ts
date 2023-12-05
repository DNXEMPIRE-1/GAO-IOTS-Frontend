import { Component, OnInit,Input,Output, EventEmitter, TestabilityRegistry } from '@angular/core';
import { RfidDevice } from 'src/app/model/rfidDevice';
import { MatTableDataSource } from '@angular/material/table';
import { DashboardService } from 'src/app/services/dashboard/dashboard.service';
import { environment } from '../../../environments/environment';
import { AppConstants } from "../../constants/app.constants";
import {TagScanData}  from "src/app/model/tagscandata"
import { Tag } from 'src/app/model/tag';
import { Antenna } from 'src/app/model/antenna';

declare var SockJS: any;
declare var Stomp: any;
const ws_url: string = environment.rooturl + "/" + "ws-iots-websocket";

@Component({
  selector: 'app-testdevice',
  templateUrl: './testdevice.component.html',
  styleUrls: ['./testdevice.component.css']
})
export class TestdeviceComponent implements OnInit {

  columns: string[] = [
    'tagId',
    'reader',
    'antenna',
    'count',
    'rssi',
    'time',
  ];

  static status: string;

  static readerTopic: string;
  @Input() device : RfidDevice;
  @Output() showDevice = new EventEmitter();
  static tagList: TagScanData[] = [];
  constructor(private dashboardService: DashboardService) { }

  static dataSource:  MatTableDataSource<any>;

  ngOnInit(): void {
    TestdeviceComponent.dataSource = new MatTableDataSource(TestdeviceComponent.tagList);
    if (this.device.deviceModel != null && this.device.deviceModel.driverClass != null)
    {
      let index = this.device.deviceModel.driverClass.lastIndexOf('.');
      TestdeviceComponent.readerTopic = this.device.deviceModel.driverClass.substring(index+1);
    }
  }
  connect() {
    let socket = new SockJS(ws_url);
    let stompClient = Stomp.over(socket);
    stompClient.connect({}, function (frame: any) {
      TestdeviceComponent.setStatus("Connected");
        console.log('Connected: ' + frame);
        stompClient.subscribe('/topic/monitors/' + TestdeviceComponent.readerTopic, function (message:any) {
          TestdeviceComponent.updateMonitor(message);
        });
    },);
  }

  refresh()
  {
    this.dashboardService.getRfidDeviceStatus(this.device.id).subscribe(
      responseData => {
        this.device.status =  <any> responseData.body;
      });
  }
  setGPOLowTest()
  {
    this.dashboardService.setRfidDeviceGPO(this.device.id, false).subscribe(
      responseData => {
        TestdeviceComponent.setStatus("Test finished");
      });

  }
  setGPOTest()
  {
    TestdeviceComponent.setStatus("Set Device GPO High");
    this.dashboardService.setRfidDeviceGPO(this.device.id, true).subscribe(
        responseData => {
          TestdeviceComponent.setStatus("Set Device GPO Low");
          setTimeout(()=>this.setGPOLowTest()
          ,5*1000); // wait for 5 seconds
        });

    return;
  }
  clear()
  {
    TestdeviceComponent.tagList = [];
    TestdeviceComponent.dataSource = new MatTableDataSource(TestdeviceComponent.tagList);
  }
  test()
  {
    this.connect();
    setTimeout(()=>this.setGPOTest()
    ,5*1000); // wait for 5 seconds
  }
  back(): void {
    this.showDevice.emit();
	}
  static setStatus(status: string)
  {
    TestdeviceComponent.status = status;
  }
  getStatus() : string
  {
    return TestdeviceComponent.status;
  }
  static updateMonitor(message: any)
  {
    let scanData: TagScanData = JSON.parse(message.body);
    TestdeviceComponent.tagList.push(scanData);
    TestdeviceComponent.dataSource.connect().next(TestdeviceComponent.tagList);
  }
  getDataSource() : any
  {
    return TestdeviceComponent.dataSource;
  }
}
