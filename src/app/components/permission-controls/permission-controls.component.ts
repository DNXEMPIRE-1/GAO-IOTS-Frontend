import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Schedule } from 'src/app/model/schedule';
import { DashboardService } from 'src/app/services/dashboard/dashboard.service';
import { WeekDaySchedule } from 'src/app/model/weekday-schedule';
import { ScheduleAction } from 'src/app/model/schedule-action';
import { LocationAccessSchedule } from 'src/app/model/location_access_schedule';

@Component({
  selector: 'app-permission-controls',
  templateUrl: './permission-controls.component.html',
  styleUrls: ['./permission-controls.component.css']
})
export class PermissionControlsComponent implements OnInit, OnChanges {

  @Input()
  locationAccessSchedule: LocationAccessSchedule;

  status: string;
  title?: string;
  schedule: Schedule;
  selectedDay : WeekDaySchedule;
  displayedColumns: string[] = ['day-of-week', 'schedules'];
  constructor(private dashboardService: DashboardService) { }

  ngOnChanges(changes: SimpleChanges): void {

      this.schedule = this.locationAccessSchedule.schedule;
      this.title = this.schedule.name;

  }
  ngOnInit(): void {

  }
  getWeekDaySchedules() : WeekDaySchedule[]
  {
    if (this.schedule.type === 1)
    {
      return this.schedule.weekDaySchedules;
    }
    else
      return null as any;
  }
  selectRow(row: WeekDaySchedule)
  {
    this.selectedDay = row;
  }
  configPermission(scheduleAction: ScheduleAction)
  {
  }
}


