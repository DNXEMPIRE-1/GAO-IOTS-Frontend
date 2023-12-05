import { Component, OnInit, Input, Output, EventEmitter, OnChanges, AfterViewInit,SimpleChanges,ViewChild,ElementRef } from '@angular/core';
import { environment } from '../../../environments/environment';
import { AppConstants } from "../../constants/app.constants";
import {TagScanData}  from "src/app/model/tagscandata"
import { Tag } from 'src/app/model/tag';
import { Antenna } from 'src/app/model/antenna';
import { RfidDevice } from 'src/app/model/rfidDevice';
import { DashboardService } from '../../services/dashboard/dashboard.service';
import { RfidLocation } from 'src/app/model/rfidLocation';
import { fromEvent,Subscription } from 'rxjs';

declare var SockJS: any;
declare var Stomp: any;
const ws_url: string = environment.rooturl + "/" + "ws-iots-websocket";

@Component({
  selector: 'app-monitor',
  templateUrl: './monitor.component.html',
  styleUrls: ['./monitor.component.css']
})


export class MonitorComponent implements OnInit, AfterViewInit {

  @Output() backClick = new EventEmitter();
  @Input() width = 712;
  @Input() height = 418;
  @ViewChild('canvas') canvas: ElementRef;
  public ctx: CanvasRenderingContext2D;
  drawingSubscription: Subscription;
  background: any;
  currentImageData: any;
  x: number = 0;
  y: number = 0;

  static locationCount: number = 0;
  static status: string;
  monitoredList : RfidLocation[];
  selectedLocation: RfidLocation;
  tags: Tag[];
  devices: RfidDevice[];
  antennas: Antenna[];

  constructor(private dashboardService: DashboardService) { }

  drawLocation()
  {
    // get the context
    const canvasEl: HTMLCanvasElement = this.canvas.nativeElement;
    this.ctx = this.canvas.nativeElement.getContext('2d');

    // set the width and height
    canvasEl.width = this.width;
    canvasEl.height = this.height;
    this.background = new Image();
    if (this.selectedLocation.image != null)
      this.background.src = this.selectedLocation.image;
    else
      this.background.src = './assets/images/toronto.jpg';
    this.background.onload = () => {
      canvasEl.width = this.background.width;
      canvasEl.height = this.background.height;
      this.ctx.drawImage(this.background, 0, 0);

      this.drawDeployedTags();
      this.drawDeployedDevices();
      this.drawDeployedAntennas();
      this.ctx.stroke();
  }
}
ngAfterViewInit(): void {
  this.dashboardService.getMonitoredLocations().subscribe(
    responseData => {
      this.monitoredList = <any> responseData.body;
      if (this.monitoredList != null)
      {
          MonitorComponent.locationCount = this.monitoredList.length;
          this.selectedLocation = this.monitoredList[0];
          this.drawLocation();
          this.connect();
      }
    } ,
    error => {
      MonitorComponent.status = error.message;
    });

}
ngOnInit(): void {


  }
  connect() {
    let socket = new SockJS(ws_url);
    let stompClient = Stomp.over(socket);
    stompClient.connect({}, function (frame: any) {
      MonitorComponent.setConnected("connected");
        console.log('Connected: ' + frame);
        stompClient.subscribe('/topic/monitors', function (message:any) {
          MonitorComponent.updateMonitor(message);
        });
    },);
  }

  getStatus() : String
  {
    return MonitorComponent.status;
  }
  static setConnected(status: string)
  {
    MonitorComponent.status = status;
  }
  static updateMonitor(message: any)
  {
    let scanData = JSON.parse(message.body);
    console.log('scandata: ' + scanData.id);

  }
  public locationCounter() : number
  {
    return MonitorComponent.locationCount;
  }
  public getLocations() : RfidLocation[]
  {
    return this.monitoredList;
  }
  showLocation(location: RfidLocation)
  {
    this.selectedLocation = location;
    this.drawLocation();
  }


  copyCurrentDot(x: number, y: number)
    {
      this.currentImageData = this.ctx.getImageData(x, y, 10, 10);
    }


  clearPrevious() {

    if (this.x > 0 || this.y > 0)
    {
      this.ctx.beginPath();
      this.ctx.putImageData(this.currentImageData,this.x, this.y);
      this.ctx.closePath();
    }
  }
  drawDeployedTags()
  {
    this.dashboardService.getLocationTags(this.selectedLocation.id).subscribe(responseData => {
      this.tags = <any> responseData.body;
      const circle = new Path2D();
      for (var i = 0; i < this.tags.length; i++)
      {
          if(this.tags[i].x && this.tags[i].y)
          {
            let x = this.tags[i].x!;
            let y = this.tags[i].y!;
            this.ctx.beginPath();
            this.ctx.arc(x, y, 5, 0, 2 * Math.PI);
            this.ctx.fillStyle = 'blue';
            this.ctx.fill();
          }
      }
    })

  }
  drawDeployedDevices()
  {
    this.dashboardService.getLocationDevices(this.selectedLocation.id).subscribe(responseData => {
      this.devices = <any> responseData.body;
      const circle = new Path2D();
      for (var i = 0; i < this.devices.length; i++)
      {
          if(this.devices[i].locationX && this.devices[i].locationY)
          {
            let x = this.devices[i].locationX!;
            let y = this.devices[i].locationY!;
            this.ctx.beginPath();
            this.ctx.arc(x, y, 5, 0, 2 * Math.PI);
            this.ctx.fillStyle = 'red';
            this.ctx.fill();
          }
      }
    })
  }
  drawDeployedAntennas()
  {
    this.dashboardService.getLocationAntennas(this.selectedLocation.id).subscribe(responseData => {
      this.antennas = <any> responseData.body;
      const circle = new Path2D();
      for (var i = 0; i < this.antennas.length; i++)
      {
          if(this.antennas[i].locationX && this.antennas[i].locationY)
          {
            let x = this.antennas[i].locationX!;
            let y = this.antennas[i].locationY!;
            this.ctx.beginPath();
            this.ctx.arc(x, y, 5, 0, 2 * Math.PI);
            this.ctx.fillStyle = 'green';
            this.ctx.fill();
          }
      }
    })
  }
}
