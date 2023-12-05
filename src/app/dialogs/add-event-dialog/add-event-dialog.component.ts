import { Component, Inject, OnInit,Output,EventEmitter } from '@angular/core';
import { RfidEntity } from 'src/app/model/rfidEntity.model';
import { EntityTimeData } from 'src/app/model/entity_time_data';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DashboardService } from '../../services/dashboard/dashboard.service';
import { AccessHistory } from 'src/app/model/access-history';
@Component({
  selector: 'app-add-event-dialog',
  templateUrl: './add-event-dialog.component.html',
  styleUrls: ['./add-event-dialog.component.css']
})
export class AddEventDialogComponent implements OnInit {

  @Output()
  eventAdded = new EventEmitter();

  entityTimeData: EntityTimeData;
  accessHistory: AccessHistory;
  entity: RfidEntity;
  date: Date;
  time: string = '00:00';
  locationName: string;
  eventType: number;
  status: string;
  constructor(public dialogRef: MatDialogRef<AddEventDialogComponent>, private dashboardService: DashboardService,
    @Inject(MAT_DIALOG_DATA) public data: {entityTimeData: EntityTimeData, entity: RfidEntity, accessHistory: AccessHistory})
    {
      this.entityTimeData = data.entityTimeData;
      this.entity = data.entity;
      this.date = new Date(data.entityTimeData.timestamp);
      this.accessHistory = data.accessHistory;
      if (this.accessHistory)
      {
        this.time = this.getDayTimeString(this.accessHistory.timestamp);
        this.eventType = this.accessHistory.eventType;
        this.locationName = this.accessHistory.locationName;
      }
      else if (this.entityTimeData.accessHistoryList && this.entityTimeData.accessHistoryList.length > 0)
      {
        this.locationName = this.entityTimeData.accessHistoryList[0].locationName;
      }
    }

  ngOnInit(): void {
  }

  onNoClick(): void {
		this.dialogRef.close(false);
	}
  addEvent(): void {
    this.status = '';
    if (this.time && (this.eventType === 1 || this.eventType === 2) && this.locationName)
    {
      let accessHistory: AccessHistory;
      let timestamp = this.toTimeStamp(this.time);
      if (!this.accessHistory)
      {
        let uuid = crypto.getRandomValues(new Uint32Array(4)).join('-');
         accessHistory = {id: uuid,entityId: this.entity.id, locationName:this.locationName, entityName: this.entity.name,locationId:'',
	                                      	tagId: this.entity.tagid,	eventType: this.eventType, timestamp: timestamp,	adjustment: true,	valid: true};
      }
      else
      {
        accessHistory = this.accessHistory;
        accessHistory.locationName = this.locationName;
        accessHistory.timestamp = timestamp;
        accessHistory.eventType = this.eventType;
      }
      this.dashboardService.addAccessHistory(accessHistory).subscribe(
        responseData => {
        // looking good
        if (!this.entityTimeData.accessHistoryList)
         this.entityTimeData.accessHistoryList = [];
        if (!this.accessHistory)
          this.entityTimeData.accessHistoryList.push(accessHistory);
        this.entityTimeData.accessHistoryList.sort(function comp(a,b) { if (a.timestamp <= b.timestamp) return -1; else return 1;});
        this.dialogRef.close(true);
      } ,
      error => {
        this.status = error.message;
      });

    }
    else
      this.status = "Please provide time, event and location information";
  }
  getDayTimeString(timestamp: number): string
  {
    let rc : string = '00:00';
    let date: Date = new Date(timestamp);
    rc = this.pad(date.getHours()) + ':' + this.pad(date.getMinutes());
    return rc;
  }
  pad(num:number): string {
    let s = num+"";
    while (s.length < 2) s = "0" + s;
    return s;
  }
  toTimeStamp(timeString: string): number
  {
    let rc: number = 0;
    let temp : string[]= timeString.split(":");
    let hour : number = Number(temp[0]);
    let minute : number = Number(temp[1]);
    let startOfDay = this.entityTimeData.timestamp;
    rc = startOfDay  + hour*60*60*1000 + minute*60*1000;
    return rc;
  }
}
