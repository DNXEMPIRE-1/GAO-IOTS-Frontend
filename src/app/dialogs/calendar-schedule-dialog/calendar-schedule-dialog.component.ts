import { Component, OnInit, Inject } from '@angular/core';
import { ScheduleAction } from 'src/app/model/schedule-action';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Schedule } from 'src/app/model/schedule';
import { StringMapping } from 'src/app/model/stringmapping';
import { TimeRange } from 'src/app/model/time-range';
import { DashboardService } from '../../services/dashboard/dashboard.service';
import { Permission } from 'src/app/model/permission';

@Component({
  selector: 'app-calendar-schedule-dialog',
  templateUrl: './calendar-schedule-dialog.component.html',
  styleUrls: ['./calendar-schedule-dialog.component.css']
})
export class CalendarScheduleDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<CalendarScheduleDialogComponent>,
    private dashboardService: DashboardService,
		@Inject(MAT_DIALOG_DATA) public data: {schedule: Schedule, permissions: Permission[]})
    {
      this.calendarSchedule = data.schedule;
      this.permissions = data.permissions;
    }

    calendarSchedule : Schedule;
    permissions: Permission[];
    selectedPermission: Permission;
    timeRange: TimeRange = {from:'00:00', end:'23:59'};
    title: string;

  ngOnInit()
  {

  }
  onNoClick()
  {
    this.dialogRef.close(false);
  }
  update()
  {
    let action : ScheduleAction = {permission: this.selectedPermission, timeRange: this.timeRange}
    this.calendarSchedule.actions.push(action);

  }
  save()
  {
    this.dashboardService.saveSchedule(this.calendarSchedule).subscribe(
      responseData => {
        this.dialogRef.close(true);
      } );

  }
  closeDialog()
  {
    this.dialogRef.close();
  }
  removeAction(action: ScheduleAction)
  {
    const index = this.calendarSchedule.actions.indexOf(action, 0);
    if (index > -1) {
      this.calendarSchedule.actions.splice(index, 1);
      this.save();
    }
  }
}
