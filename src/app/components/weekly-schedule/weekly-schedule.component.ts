import { Input, Component, OnInit, Output, EventEmitter, OnChanges } from '@angular/core';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';
import { TimeRange } from 'src/app/model/time-range';
import { WeekDaySchedule } from 'src/app/model/weekday-schedule';
import { DashboardService } from '../../services/dashboard/dashboard.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { TimePickerComponent } from 'src/app/dialogs/time-picker/time-picker.component';
import { Schedule } from 'src/app/model/schedule';
import { ScheduleAction } from 'src/app/model/schedule-action';
import { ConfirmationDialogComponent } from 'src/app/dialogs/confirmation-dialog/confirmation-dialog.component';
import { Permission } from 'src/app/model/permission';

@Component({
  selector: 'app-weekly-schedule',
  templateUrl: './weekly-schedule.component.html',
  styleUrls: ['./weekly-schedule.component.css']
})
export class WeeklyScheduleComponent implements OnInit {

  weekSchedule: Schedule = null!;
  displayedColumns: string[] = ['day-of-week', 'schedules','add'];

  weekDaySchedules: WeekDaySchedule[] = [
    {dayIndex: 1, actions: []},
    {dayIndex: 2, actions: []},
    {dayIndex: 3, actions: []},
    {dayIndex: 4, actions: []},
    {dayIndex: 5, actions: []},
    {dayIndex: 6, actions: []},
    {dayIndex: 7, actions: []},
  ];

  periods: string[] = ['12:00AM','06:00AM','12:00PM','06:00PM','11:59P'];

  message: string;
  dpDialogRef : MatDialogRef<TimePickerComponent>;
  @Input()
  permissions: Permission[];

  selectedDay: WeekDaySchedule = null!;
  weekSchedules: Schedule[];
  constructor(private dashboardService: DashboardService,protected dialog: MatDialog) { }

  ngOnInit(): void {

    if (this.weekSchedule == null)
    {
      this.weekSchedule = {id:'', type: 1, name:'', weekDaySchedules: this.weekDaySchedules, date: null as any, actions: null as any}
    }
    this.dashboardService.getWeeklySchedules().subscribe(
      responseData => {
        this.weekSchedules =  <any> responseData.body;
      } );

  }

  ngOnChanges() {
    if (this.weekSchedule == null)
    {
      this.weekSchedule = {id:'', type: 1, name:'', weekDaySchedules: this.weekDaySchedules, date: null as any, actions: null as any}
    }
    else
    {
      if (this.weekSchedule.weekDaySchedules)
      {
        for (let daySchedule of this.weekSchedule.weekDaySchedules)
          this.sortScheduleActions(daySchedule.actions);
      }
    }
  }
  selectSchedule(weekSchedule: Schedule)
  {
    this.weekSchedule = weekSchedule;
  }
  selectRow(row: WeekDaySchedule)
  {
    this.selectedDay = row;
    this.message = null!;
  }
  newAction(row: WeekDaySchedule)
  {
    this.selectedDay = row;
    this.dpDialogRef = this.dialog.open(TimePickerComponent , {
      width: '550px',
      data: { day: this.selectedDay, permissions: this.permissions}
    });
  }
  editWeekSchedule()
  {
    if (this.selectedDay == null)
      this.message = 'Please select a day in the week';
    else
    {
      this.dpDialogRef = this.dialog.open(TimePickerComponent , {
        width: '550px',
        data: { day: this.selectedDay, permissions: this.permissions}
      });
    }
  }
  newWeekSchedule()
  {
    this.weekSchedule = {id:'', type: 1, name:'', weekDaySchedules: this.weekDaySchedules, date: null as any, actions: null as any}
  }
  save()
  {
     this.dashboardService.saveSchedule(this.weekSchedule).subscribe(
      responseData => {
          this.weekSchedule = <any> responseData.body;
          this.message = "Schedule " + this.weekSchedule.name + " updated";
          this.refresh();
      } );
  }

  openTimePicker(scheduleAction: ScheduleAction)
  {
    if (this.selectedDay == null)
      this.message = 'Please select a day in the week';
    else
    {
      this.dpDialogRef = this.dialog.open(TimePickerComponent , {
        width: '550px',
        data: { day: this.selectedDay, permissions: this.permissions, scheduleAction: scheduleAction}
      });
    }
  }
  sortScheduleActions(actions: ScheduleAction[]) : void
  {
    if (actions != null && actions.length > 1)
      actions.sort((a,b) => a.timeRange.from.localeCompare(b.timeRange.from));
  }
  onDeleteSchedule(weekSchedule: Schedule)
  {
    let dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: 'Are you sure you want to delete?'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result == true)
        this.deleteSchedule(weekSchedule);
    })
  }
  deleteSchedule(weekSchedule: Schedule)
  {
    this.dashboardService.deleteSchedule(weekSchedule.id).subscribe(
      responseData => {
          this.message = "Schedule " + weekSchedule.name + " removed";
          this.refresh();

      } );
  }
  refresh()
  {
    this.dashboardService.getWeeklySchedules().subscribe(
      responseData => {
        this.weekSchedules =  <any> responseData.body;

      } );
  }
  removeAction(action: ScheduleAction)
  {
    const index = this.selectedDay.actions.indexOf(action, 0);
    if (index > -1) {
      this.selectedDay.actions.splice(index, 1);
      this.save();
    }
  }
}
