import { Component, OnInit, Input,OnChanges } from '@angular/core';
import { DashboardService } from '../../services/dashboard/dashboard.service';
import { Schedule } from 'src/app/model/schedule';

@Component({
  selector: 'app-location-schedule-view',
  templateUrl: './location-schedule-view.component.html',
  styleUrls: ['./location-schedule-view.component.css']
})
export class LocationScheduleViewComponent implements OnInit, OnChanges {

  @Input() schedules: string[];
  status: string;
  calendarSchedules: Schedule[] = [];
  weeklySchedules: Schedule[] = [];
  constructor(private dashboardService: DashboardService) { }

  ngOnInit(): void {

  }
  ngOnChanges()
  {
    this.loadData();
  }
  loadData()
  {
    this.calendarSchedules = [];
    this.weeklySchedules = [];
    for (let scheduleId of this.schedules)
    {
    this.dashboardService.getSchedule(scheduleId).subscribe(
      responseData => {
        let schedule =  <any> responseData.body;
        if (schedule.type ===1)
          this.weeklySchedules.push(schedule);
        else if (schedule.type ===2)
        {
          this.weeklySchedules.push(schedule);
        }},
        error => {
          this.status = error.message;
        } );
      }

    }
}

