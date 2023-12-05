import { Component, OnInit,EventEmitter, Output, Input } from '@angular/core';
import { RfidLocation } from 'src/app/model/rfidLocation';
import { LocationNode } from 'src/app/model/location_node';
import { DashboardService } from '../../services/dashboard/dashboard.service';
import {NestedTreeControl} from '@angular/cdk/tree';
import {MatTreeNestedDataSource} from '@angular/material/tree';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { LocationDialogComponent } from 'src/app/dialogs/location-dialog/location-dialog.component';
import { ConfirmationDialogComponent } from 'src/app/dialogs/confirmation-dialog/confirmation-dialog.component';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { LocationImageDialogComponent } from 'src/app/dialogs/location-image-dialog/location-image-dialog.component';
import { Tag } from 'src/app/model/tag';
import { RfidDevice } from 'src/app/model/rfidDevice';
import { Group } from 'src/app/model/group';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import { Schedule } from 'src/app/model/schedule';


@Component({
  selector: 'app-access-schedules',
  templateUrl: './access-schedules.component.html',
  styleUrls: ['./access-schedules.component.css']
})
export class AccessSchedulesComponent implements OnInit {

  @Output() locationSelected = new EventEmitter<any>();
  @Output() closeSelectEvent = new EventEmitter();

  @Input() groups: Group[];

  draggingId: string;
  dropNode: LocationNode;
  selectedGroup: Group;
  groupMembers: RfidLocation[] = [];
  imgDialogRef : MatDialogRef<LocationImageDialogComponent>;
  locationList: RfidLocation[] = [];
  treeControl = new NestedTreeControl<LocationNode>(node => node.children);
  dataSource = new MatTreeNestedDataSource<LocationNode>();
  selected: LocationNode;
  weekSchedules : Schedule[];
  calendarSchedules : Schedule[];
  constructor(private router: Router, private dashboardService: DashboardService,protected dialog: MatDialog) { }

  ngOnInit(): void {
    this.getLocationTree();
    this.getSchedules();
  }

  hasChild = (_: number, node: LocationNode) => !!node.children && node.children.length > 0;
  showImage(node: LocationNode)
  {
     this.imgDialogRef = this.dialog.open(LocationImageDialogComponent , {

      data: { name: node.location.name, base64: node.location.image}
    });
  }
  getSchedules()
  {
    this.dashboardService.getWeeklySchedules().subscribe(
      responseData => {
        this.weekSchedules =  <any> responseData.body;
      },)
    this.dashboardService.getCalendarSchedules().subscribe(
      responseData => {
        this.calendarSchedules =  <any> responseData.body;
      },)
  }
  getLocationTree()
	{
    this.dashboardService.getLocationTree().subscribe(
      responseData => {
        this.dataSource.data =  <any> responseData.body;
      },)
	}

  onSelected(node:LocationNode)
  {
    this.selected = node;
    this.dropNode = node;
    this.locationSelected.emit(this.selected.location);
  }
  backHome()
  {
    this.router.navigate(['tags']);
  }

  closeSelection()
  {
    this.closeSelectEvent.emit();
  }
  showGroup()
  {
    this.dashboardService.getGroupLocations(this.selectedGroup.id).subscribe(
      responseData => {
        this.groupMembers =  <any> responseData.body;
        if (this.groupMembers == null)
          this.groupMembers = [];
      } );
  }
  allowDrop(event: Event)
  {
    event.preventDefault();
  }
  drop(event: Event, locationNode: LocationNode) {
    event.preventDefault();
    if (this.draggingId != null)
    {
      this.dropNode = locationNode;
      if(locationNode.location.schedules == null)
        locationNode.location.schedules = [];
      const result = locationNode.location.schedules.find(s => s === this.draggingId);
      if (result == null) // make sure no duplication
      {
          locationNode.location.schedules.push(this.draggingId);
          this.dashboardService.updateLocation(locationNode.location).subscribe(
            responseData => {

            } );
      }
    }
    this.draggingId = null!;
  }
  dropGroup(event: Event, group: Group) {
    event.preventDefault();
    if (this.draggingId != null)
    {
      /*
      if(group.schedules == null)
        group.schedules = [];
      const result = group.schedules.find(s => s === this.draggingId);
      if (result == null) // make sure no duplication
      {
        group.schedules.push(this.draggingId);
        this.dashboardService.saveGroup(group).subscribe(
          responseData => {
            // cool
          } );
      }
      */
    }
    this.draggingId = null!;
  }
  drag(scheduleId: string) {
    this.draggingId = scheduleId;
  }
  onSave()
  {
    if (this.selectedGroup != null)
    {
      let members: string[] = [];
      for (let member of this.groupMembers)
      {
        const result = members.find(s => s === member.id);
        if (result == null) // make sure no duplication
          members.push(member.id);
      }
      this.dashboardService.saveGroupMembers(this.selectedGroup,members).subscribe(
        responseData => {

        } );
    }
  }
  onRemove(location: RfidLocation)
  {
    const objIndex = this.groupMembers.findIndex(obj => obj.id === location.id);
    if (objIndex > -1) {
      this.groupMembers.splice(objIndex, 1);
      this.onSave();
    }
  }
  showSchedule(id:string): string
  {
    let rc : string = "";
    const weekschedule = this.weekSchedules.find(s=> s.id === id)
    if (weekschedule != null)
      rc = weekschedule.name;
    else
    {
      const calschedule = this.calendarSchedules.find(s=> s.id === id)
    if (calschedule != null)
      rc = calschedule.name;
    }
    return rc;
  }
  removeGroupSchedule(group: Group, scheduleId : string)
  {
    /*
    if (group.schedules != null)
    {
      let index = group.schedules.indexOf(scheduleId);
      if (index >= 0)
      {
		    group.schedules.splice(index, 1);
        this.dashboardService.saveGroup(group).subscribe(
          responseData => {

          } );
      }
    }
    */
  }
  removeSchedule(location: RfidLocation, scheduleId : string)
  {
    if (location.schedules != null)
    {
      let index = location.schedules.indexOf(scheduleId);
      if (index >= 0)
      {
		    location.schedules.splice(index, 1);
        this.dashboardService.updateLocation(location).subscribe(
          responseData => {

          } );
      }
    }
  }
}
