import { Component, OnInit, Output, EventEmitter,ViewChild } from '@angular/core';
import { ReportService } from 'src/app/services/report.service';
import { ReportItem } from 'src/app/model/report-item';
import { ReportRequest } from 'src/app/model/reportrequest';
import { ReportData } from 'src/app/model/report-data';
import { AccessHistory } from 'src/app/model/access-history';
import { ReportDataField } from 'src/app/model/report-data-field';
import { ReportDataRow } from 'src/app/model/report-data-row';
import { ReportPage } from 'src/app/model/reportpage';
import {MatSort, Sort} from '@angular/material/sort';
import { PageEvent } from "@angular/material/paginator";
import {MatAccordion} from '@angular/material/expansion';
import { EntityTimeData } from 'src/app/model/entity_time_data';
import { EntityProfileDialogComponent } from 'src/app/dialogs/entity-profile-dialog/entity-profile-dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DashboardService } from '../../services/dashboard/dashboard.service';
import { AddEventDialogComponent } from 'src/app/dialogs/add-event-dialog/add-event-dialog.component';
import { A } from '@angular/cdk/keycodes';
import { validateVerticalPosition } from '@angular/cdk/overlay';

@Component({
  selector: 'app-assessment',
  templateUrl: './assessment.component.html',
  styleUrls: ['./assessment.component.css']
})
export class AssessmentComponent implements OnInit {

  @ViewChild(MatAccordion) accordion: MatAccordion;
  className = 'com.gaorfid.service.EntityTimeReport';
  @Output() backClick = new EventEmitter();
  startDate: Date = new Date();
  endDate:   Date = new Date();
  reportData: ReportDataRow[];
  reportPage: ReportPage;
  reportItem : ReportItem;
  status: string;
  sortBy: string = '';
  sortByOrder: number = 0;
  pageIndex: number = 0;
	pageSize: number = 10;
  totalElements = 0;
  searchText: string = '';
  searchField: string = '';
  columns: string[];
  constructor(private reportService: ReportService,private dashboardService: DashboardService,protected dialog: MatDialog) { }

  ngOnInit(): void {
    this.reportService.getReportItem(this.className).subscribe(
      responseData => {
      this.reportItem = <any> responseData.body;
      this.sortBy = this.reportItem.columns[0]; // default to the first column
      this.searchField = this.reportItem.columns[0];
      this.sortBy = this.reportItem.columns[0];
      this.sortByOrder = 0;
      this.pageIndex   = 0;
	    this.pageSize   = 10;
      this.totalElements = 0;
      this.searchText    = '';
      this.search();
      },
      error => {
        this.status = error.message;
      });
  }

  showReport() {

      this.sortBy = this.reportItem.columns[0]; // default to the first column
      this.searchField = this.reportItem.columns[0];
      this.sortBy = this.reportItem.columns[0];
      this.sortByOrder = 0;
      this.pageIndex   = 0;
	    this.pageSize   = 10;
      this.totalElements = 0;
      this.searchText    = '';
      this.search();

	}
  search() {

      let request : ReportRequest = {className: this.className, startDate: this.startDate, endDate: this.endDate,
                                      searchText: this.searchText, searchField: this.searchField,
                                      sortBy: this.sortBy, sortByOrder: this.sortByOrder, pageIndex: this.pageIndex, pageSize: this.pageSize};
      this.reportService.getReportData(request).subscribe(
        responseData => {
        this.reportPage = <any> responseData.body;
        this.reportData = this.reportPage.content;
        this.totalElements  = this.reportPage.totalElements;
        });

  }

  onPage(event: PageEvent) {
			this.pageIndex = event.pageIndex;
			this.pageSize =  event.pageSize;
			this.search();
	}
  setEventStatus(accessHitory: AccessHistory, status: boolean)
  {
    this.reportService.setAccessHistoryStatus(accessHitory.id, status).subscribe(
      responseData => {
        accessHitory.valid = status;
      });
  }
  showProfile(entityTimeData: EntityTimeData)
  {
    this.dashboardService.getRfidEntity(entityTimeData.entityId).subscribe(
      responseData => {
        let entity = responseData.body;
        if (entity)
        {
          let dialogRef = this.dialog.open(EntityProfileDialogComponent , {
            width: '600px',
            data: {entity: entity}
          });
        }
      }
    )

  }
  addEvent(entityTimeData: EntityTimeData)
  {
    this.dashboardService.getRfidEntity(entityTimeData.entityId).subscribe(
      responseData => {
        let entity = responseData.body;
        if (entity)
        {
          let dialogRef = this.dialog.open(AddEventDialogComponent , {
            width: '600px',
            data: {entity: entity, entityTimeData: entityTimeData}
          });

          dialogRef.afterClosed().subscribe(result => {
            if (result == true)
            {
            //  this.search();
            }
          })
        }
      }
    )
  }
  editEvent(entityTimeData: EntityTimeData, accessHistory: AccessHistory)
  {
    this.dashboardService.getRfidEntity(entityTimeData.entityId).subscribe(
      responseData => {
        let entity = responseData.body;
        if (entity)
        {
          let dialogRef = this.dialog.open(AddEventDialogComponent , {
            width: '600px',
            data: {entity: entity, entityTimeData: entityTimeData, accessHistory: accessHistory}
          });

          dialogRef.afterClosed().subscribe(result => {
            if (result == true)
            {
            //  this.search();
            }
          })
        }
      }
    )
  }
  deleteEvent(entityTimeData: EntityTimeData, accessHistory: AccessHistory)
  {
    this.reportService.removeAccessHistory(accessHistory.id).subscribe(
      responseData => {
        let index = entityTimeData.accessHistoryList.indexOf(accessHistory);
        if (index >= 0)
        {
          entityTimeData.accessHistoryList.splice(index, 1);
          this.getHours(entityTimeData);
        }
      });
  }
  getAccessHistory(accessHistoryList: AccessHistory[], startindex: number): number
  {
    let rc : number = -1;
    for (let i= startindex; i<  accessHistoryList.length; i++)
    {
      if (accessHistoryList[i].valid == false)
        continue;
      else
      {
        rc = i;
        break;
      }

    }
    return rc;
  }
  getHours(entityTimeData: EntityTimeData) : any
  {
    entityTimeData.totalHours = -1; // the default value
    if (!entityTimeData.accessHistoryList)
      entityTimeData.totalHours = 0;
    else if (entityTimeData.accessHistoryList.length == 1)
    {
      entityTimeData.totalHours = -1; // for sure missing exit time or has the wrong event
    }
    else if (entityTimeData.accessHistoryList.length > 1)
    {
      let startIndex = 0;
      while (startIndex >= 0 && startIndex < entityTimeData.accessHistoryList.length)
      {
        let enterIndex = this.getAccessHistory(entityTimeData.accessHistoryList, startIndex);
        if (enterIndex >=0 && entityTimeData.accessHistoryList[enterIndex].eventType == 1)
        {
          let exitIndex  = this.getAccessHistory(entityTimeData.accessHistoryList, enterIndex+1);
          if (exitIndex > 0 && entityTimeData.accessHistoryList[exitIndex].eventType == 2)
          {
            entityTimeData.totalHours += (entityTimeData.accessHistoryList[exitIndex].timestamp - entityTimeData.accessHistoryList[enterIndex].timestamp)/(60*1000)
            startIndex = exitIndex+1;
          }
          else
          {
             // error - no exit for the period
             entityTimeData.totalHours = -1;
             break;
          }
        }
        else
        {
          entityTimeData.totalHours = -1;
          break;
        }
      }
    }

    if (entityTimeData.totalHours > 0)
    {
      let hours = Math.floor(entityTimeData.totalHours/60);
      let minutes = this.pad(entityTimeData.totalHours % 60);
      return '[ Hours: ' + hours + ':' + minutes +' ]';
    }
    else if (entityTimeData.totalHours == 0)
      return '';
    else
      return '[ Hours: n/a ]';
  }
  pad(num:number): string {
    let s = num+"";
    while (s.length < 2) s = "0" + s;
    return s;
}
}
