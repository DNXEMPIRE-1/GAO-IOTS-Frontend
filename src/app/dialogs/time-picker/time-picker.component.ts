import { Component, OnInit, Inject } from '@angular/core';
import { ScheduleAction } from 'src/app/model/schedule-action';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { WeekDaySchedule } from 'src/app/model/weekday-schedule';
import { StringMapping } from 'src/app/model/stringmapping';
import { Permission } from 'src/app/model/permission';

@Component({
  selector: 'app-time-picker',
  templateUrl: './time-picker.component.html',
  styleUrls: ['./time-picker.component.css']
})
export class TimePickerComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<TimePickerComponent>,
		@Inject(MAT_DIALOG_DATA) public data: {day: WeekDaySchedule, scheduleAction: ScheduleAction, permissions: Permission[]})
    {
      this.weekdaySchedule = data.day;
      if (data.scheduleAction == null)
        this.scheduleAction = {permission: data.permissions[0], timeRange: { from:'00:00:00', end:'23:59'}}
      else
        this.scheduleAction = data.scheduleAction;
      this.permissions = data.permissions;
    }

  scheduleAction: ScheduleAction;
  weekdaySchedule : WeekDaySchedule;
  permissions: Permission[];
  title: string;
  ngOnInit()
  {
    this.title = StringMapping.getDayString(this.data.day.dayIndex);
  }
  onNoClick()
  {
    this.dialogRef.close(false);
  }
  update()
  {
    this.weekdaySchedule.actions.push(this.scheduleAction);
    this.dialogRef.close(false);
  }
  closeDialog()
  {
    this.dialogRef.close();
  }
}
