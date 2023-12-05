import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {  AfterViewInit,  Component,  ElementRef,  OnInit,Inject,  Input, Output, EventEmitter,  ViewChild} from '@angular/core';
import { fromEvent,Subscription } from 'rxjs';
import { pairwise, switchMap, takeUntil } from 'rxjs/operators';
import { ConnectedOverlayPositionChange } from '@angular/cdk/overlay';
import { Tag } from 'src/app/model/tag';
import { DashboardService } from 'src/app/services/dashboard/dashboard.service';
import { RfidDevice } from 'src/app/model/rfidDevice';
import { Antenna } from 'src/app/model/antenna';
import { RfidLocation } from 'src/app/model/rfidLocation';


@Component({
  selector: 'app-location-image-dialog',
  templateUrl: './location-image-dialog.component.html',
  styleUrls: ['./location-image-dialog.component.css']
})
export class LocationImageDialogComponent implements OnInit, AfterViewInit {

  @Input() width = 712;
  @Input() height = 418;
  @ViewChild('canvas') canvas: ElementRef;
  public ctx: CanvasRenderingContext2D;
  drawingSubscription: Subscription;
  background: any;
  base64?: string;
  currentImageData: any;
  x: number = 0;
  y: number = 0;
  tags : Tag[];
  devices: RfidDevice[];
  @Output() imagePosition = new EventEmitter<{x: number, y: number}>();
  constructor(
		public dialogRef: MatDialogRef<LocationImageDialogComponent>,
    private dashboardService: DashboardService,
		@Inject(MAT_DIALOG_DATA) public data: {location: RfidLocation, parentImage: string, tag: Tag, device: RfidDevice,
                                           antenna: Antenna, sub_title: string, setPosition: boolean})
    {}

  ngOnInit(): void {
    if (this.data.location.useParentImage)
      this.base64 = this.data.parentImage;
    else
      this.base64 = this.data.location.image;
  }
  closeDialog()
  {
    this.dialogRef.close();
  }

  ngAfterViewInit() {
    // get the context
    const canvasEl: HTMLCanvasElement = this.canvas.nativeElement;
    this.ctx = this.canvas.nativeElement.getContext('2d');

    // set the width and height
    canvasEl.width = this.width;
    canvasEl.height = this.height;
    this.background = new Image();
    this.background.src = this.base64;
    this.background.onload = () => {
      canvasEl.width = this.background.width;
      canvasEl.height = this.background.height;
      this.ctx.drawImage(this.background, 0, 0);

      this.fillTagData();
      this.fillDeviceData();
      this.fillAntennas();
      this.setPosition();
    }
  }
  fillTagData()
  {
    if (this.data.tag != null && this.data.tag.x && this.data.tag.y)
      {
        this.drawPositionXY(this.data.tag.x,this.data.tag.y,'blue');
      }
    if (this.data.location.id != null)
    {
      this.dashboardService.getLocationTags(this.data.location.id).subscribe(
        responseData => {
        this.tags =  <any> responseData.body;
        if (this.tags != null)
        {
            this.drawDeployedTags(this.tags);
        }
      });
    }
  }
  fillDeviceData()
  {
    if (this.data.device != null && this.data.device.locationX && this.data.device.locationY)
      {
        this.drawPositionXY(this.data.device.locationX,this.data.device.locationY,'red');
      }
    if (this.data.location.id != null)
      {
        this.dashboardService.getLocationDevices(this.data.location.id).subscribe(
          responseData => {
          this.devices =  <any> responseData.body;
          if (this.devices != null)
          {
             this.drawDeployedDevices(this.devices);
          }
        });
      }
  }
  setPosition()
  {
    if (this.data.setPosition && this.data.setPosition === true)
    {
      this.drawPositionXY(this.data.location.x!,this.data.location.y!,'green');
    }
  }
  fillAntennas()
  {
    if (this.data.antenna != null && this.data.antenna.locationX && this.data.antenna.locationY)
      {
        this.drawPositionXY(this.data.antenna.locationX,this.data.antenna.locationY,'darkblue');
      }
  }
  drawPosition(event: Event)
  {
    if (this.data.tag != null || this.data.device != null || this.data.antenna != null)
    {
      let mouseEvent = event as MouseEvent;
      this.drawPositionXY(mouseEvent.offsetX, mouseEvent.offsetY,'blue');
    }
    else if (this.data.setPosition && this.data.setPosition === true)
    {
      let mouseEvent = event as MouseEvent;
      this.drawPositionXY(mouseEvent.offsetX, mouseEvent.offsetY,'green');
    }
  }
    drawPositionXY(x: number, y: number, color: string)
    {
      this.clearPrevious();
      this.copyCurrentDot(x,y);
      this.ctx.beginPath();
      this.ctx.rect(x, y, 10, 10);
      this.ctx.fillStyle = color;
      this.ctx.fill();


      this.ctx.closePath();
      this.x = x;
      this.y = y;

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
  savePosition()
  {

    if (this.x > 0 || this.y > 0)
    {
      this.imagePosition.emit({x: this.x,y: this.y});
    }
    this.closeDialog();
  }
  drawDeployedTags(tags: Tag[])
    {
        const circle = new Path2D();
        for (var i = 0; i < tags.length; i++)
        {
           if(tags[i].x && tags[i].y)
           {
              let x = tags[i].x!;
              let y = tags[i].y!;
              if (this.data.tag == null || (this.data.tag != null && this.data.tag.id !== tags[i].id) )
              {
                 this.ctx.beginPath();
                 this.ctx.arc(x, y, 5, 0, 2 * Math.PI);
                 this.ctx.fillStyle = 'blue';
                 this.ctx.fill();
                }
            }
        }
    }
  drawDeployedDevices(devices: RfidDevice[])
  {
      const circle = new Path2D();
      for (var i = 0; i < devices.length; i++)
      {
          if(devices[i].locationX && devices[i].locationY)
          {
            let x = devices[i].locationX!;
            let y = devices[i].locationY!;
            if (this.data.device == null || (this.data.device != null && this.data.device.id !== devices[i].id) )
            {
                this.ctx.beginPath();
                this.ctx.arc(x, y, 5, 0, 2 * Math.PI);
                this.ctx.fillStyle = 'darkblue';
                this.ctx.fill();
              }
          }
      }
  }
}
