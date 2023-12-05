import { Component, OnInit,Output,EventEmitter } from '@angular/core';
import {NestedTreeControl} from '@angular/cdk/tree';
import {MatTreeNestedDataSource} from '@angular/material/tree';
import { ConfirmationDialogComponent } from 'src/app/dialogs/confirmation-dialog/confirmation-dialog.component';
import { RfidLocation } from 'src/app/model/rfidLocation';
import { LocationNode } from 'src/app/model/location_node';
import { DashboardService } from '../../services/dashboard/dashboard.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { LocationImageDialogComponent } from 'src/app/dialogs/location-image-dialog/location-image-dialog.component';
import { TimeRange} from 'src/app/model/time-range'
import { Schedule } from 'src/app/model/schedule';
import { CalendarScheduleDialogComponent } from 'src/app/dialogs/calendar-schedule-dialog/calendar-schedule-dialog.component';
import { ScheduleAction } from 'src/app/model/schedule-action';
import { Permission } from 'src/app/model/permission';

@Component({
  selector: 'app-schedules',
  templateUrl: './schedules.component.html',
  styleUrls: ['./schedules.component.css']
})
export class SchedulesComponent implements OnInit {

  @Output() backClick = new EventEmitter();
  selectedDate: Date | null;
  calendarSchedules: Schedule[];
  calendarSchedule: Schedule;
  message: string;
  status : string = '';
  selectedPermission: Permission;
  permissions: Permission[];
  timeRange: TimeRange = {from:'00:00', end:'23:59'};
  constructor(private dashboardService: DashboardService,protected dialog: MatDialog)
  {
    this.calendarSchedule = {id:'',type: 2, name:'', date: this.selectedDate!, actions:[], weekDaySchedules: null as any};
  }
  ngOnInit(): void {
    this.dashboardService.getSchedulePermissions().subscribe(
      responseData => {
        this.permissions =  <any> responseData.body;

      } ,
      error => {
        this.status = error.message;
      },);
    this.dashboardService.getCalendarSchedules().subscribe(
      responseData => {
        this.calendarSchedules =  <any> responseData.body;
      },
      error => {
        this.status = error.message;
      } );

  }

  refresh()
  {
    this.dashboardService.getCalendarSchedules().subscribe(
      responseData => {
        this.calendarSchedules =  <any> responseData.body;
      } );
  }
  onDeleteSchedule(calendarSchedule: Schedule)
  {
    let dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: 'Are you sure you want to delete?'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result == true)
        this.deleteSchedule(calendarSchedule);
    })
  }
  deleteSchedule(schedule: Schedule)
  {
    this.dashboardService.deleteSchedule(schedule.id).subscribe(
      responseData => {
          this.message = "Schedule " + schedule.name + " removed";
          this.refresh();

      } );
  }
  newSchedule()
  {
    this.calendarSchedule = {id:'', type: 2, name:'', date: this.selectedDate!, actions:[], weekDaySchedules: null as any};
    this.editSchedule(this.calendarSchedule);
  }
  editSchedule(schedule: Schedule)
  {
    this.calendarSchedule = schedule;
  }
  removeAction(action: ScheduleAction)
  {
    const index = this.calendarSchedule.actions.indexOf(action, 0);
    if (index > -1) {
      this.calendarSchedule.actions.splice(index, 1);
      this.save();
    }
  }
  save()
  {
    this.message = "";
    if (this.calendarSchedule.name != null && this.calendarSchedule.name.length > 0 && this.calendarSchedule.date != null)
    {
    this.dashboardService.saveSchedule(this.calendarSchedule).subscribe(
      responseData => {
        this.refresh();
      } );
    }
    else
      this.message = "Schedule name and date are required";
  }
  addAction()
  {
    let action: ScheduleAction = {permission: this.selectedPermission, timeRange: {from: this.timeRange.from, end: this.timeRange.end}}
    this.calendarSchedule.actions.push(action);
    this.calendarSchedule.actions.sort((a,b) => a.timeRange.from.localeCompare(b.timeRange.from));
  }
  clear()
  {
    this.newSchedule();
  }
  backHome()
  {
    this.backClick.emit();
  }
}
