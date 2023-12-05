import { Component, OnInit, Input, Output, EventEmitter,ViewChild, OnChanges, ElementRef, SimpleChanges} from '@angular/core';
import { Group } from 'src/app/model/group';
import { DashboardService } from '../../services/dashboard/dashboard.service';
import { ConfirmationDialogComponent } from 'src/app/dialogs/confirmation-dialog/confirmation-dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Schedule } from 'src/app/model/schedule';
import { LocationAccessSchedule } from 'src/app/model/location_access_schedule';

@Component({
  selector: 'app-user-group-list-view',
  templateUrl: './user-group-list-view.component.html',
  styleUrls: ['./user-group-list-view.component.css']
})
export class UserGroupListViewComponent implements OnInit, OnChanges {


  constructor(protected dialog: MatDialog,private dashboardService: DashboardService) { };
  selected: Group;
  @Input() groups: Group[];
  @Input() groupType: number = 0;
  scheduleName: string = 'weekly';
  locationGroups: Group[];
  locationGroup: Group;
  weeklySchedules: Schedule[];
  calendarSchedules: Schedule[];
  locationAccessSchedule: LocationAccessSchedule;
  schedule: Schedule;
  panel = 'listview';
  status: string;
  @Output()
  newCreated = new EventEmitter;
  ngOnInit(): void {
    this.dashboardService.getGroups(1)
			.subscribe(responseData => {
        this.locationGroups = <any> responseData.body;
			});
    this.dashboardService.getWeeklySchedules()
			.subscribe(responseData => {
        this.weeklySchedules = <any> responseData.body;
			});
    this.dashboardService.getCalendarSchedules()
			.subscribe(responseData => {
        this.calendarSchedules = <any> responseData.body;
			});
  }

  ngOnChanges(changes: SimpleChanges): void {

  }
  update()
  {
    this.dashboardService.saveGroup(this.selected)
			.subscribe(responseData => {
        this.panel = 'listview';
        this.dashboardService.getGroups(0)
			    .subscribe(responseData => {
          this.groups = <any>responseData.body;
			});
			});

  }
  addAccessSchedule()
  {
    this.status = '';
    if (!this.locationGroup)
    {
      this.status = 'location group is required';
      return;
    }
    if (!this.schedule)
    {
      this.status = 'schedule is required';
      return;
    }

    if (!this.selected.locationAccessSchedules)
      this.selected.locationAccessSchedules = [];

    let locationAccessShedule: LocationAccessSchedule = {locationGroupId:this.locationGroup.id,schedule:this.schedule};
    this.selected.locationAccessSchedules.push(locationAccessShedule);

  }
  getLocationGroupName(locationGroupId: string) : string
  {
    let rc: string = '';
    for (let group of this.locationGroups)
    {
      if (group.id === locationGroupId)
      {
        rc = group.name;
        break;
      }
    }
    return rc;
  }
  showSchedule(schedule: LocationAccessSchedule)
  {
    this.locationAccessSchedule = schedule;
  }
  getScheduleName(schedule: Schedule)
  {
    return schedule.name;
  }
  deleteSchedule(item: LocationAccessSchedule)
  {
    let index = this.selected.locationAccessSchedules!.indexOf(item);
    if (index >= 0)
    {
      this.selected.locationAccessSchedules!.splice(index,1);
    }
  }
  showNewPanel()
  {
    this.locationAccessSchedule = null as any;
    let group: Group = {id:'',name:'', type:this.groupType, count:0};
    this.selected = group;
    this.panel = 'edit';
  }
  showEditPanel(group: Group)
  {
    this.locationAccessSchedule = null as any;
    this.selected = group;
    this.panel = 'edit';
  }
  onDelete(group: Group)
  {
    let dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
     data: 'Are you sure you want to delete?'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result == true)
        this.deleteGroup(group);
    })
  }
  deleteGroup(group: Group)
  {
    this.dashboardService.deleteGroup(group.id)
    .subscribe(responseData => {

      this.newCreated.emit();
    });
  }
  changeSchedule()
  {
    this.schedule = undefined as any;

    if (this.scheduleName ==='weekly')
      this.scheduleName = 'calendar';
    else
      this.scheduleName = 'weekly';
  }
}


