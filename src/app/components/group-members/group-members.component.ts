import { Component, OnInit, Input } from '@angular/core';
import { Group } from 'src/app/model/group';
import { RfidEntity } from 'src/app/model/rfidEntity.model';
import { DashboardService } from '../../services/dashboard/dashboard.service';
import { RfidObject } from 'src/app/model/rfidObject.model';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
@Component({
  selector: 'app-group-members',
  templateUrl: './group-members.component.html',
  styleUrls: ['./group-members.component.css']
})
export class GroupMembersComponent implements OnInit {

  @Input() groups: Group[];
  @Input() objTypes: RfidObject[];

  message : string;
  selectedGroup: Group;
  groupMembers: RfidEntity[] = [];
  selectedType:  RfidObject;
  entities: RfidEntity[] = [];
  constructor(private dashboardService: DashboardService) { }

  ngOnInit(): void {
  }

  showGroup()
  {
    this.dashboardService.getGroupEntities(this.selectedGroup.id).subscribe(
      responseData => {
        this.groupMembers =  <any> responseData.body;
        if (this.groupMembers == null)
          this.groupMembers = [];
      } );
  }
  showEntity()
  {
    this.dashboardService.getRfidEntitiesByClassId(this.selectedType.id).subscribe(
      responseData => {
        this.entities =  <any> responseData.body;
      } );
  }
  drop(event: CdkDragDrop<RfidEntity[]>) {
    this.message = "";
    if (this.selectedGroup)
    {
        if (event.previousContainer === event.container) {
          moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
        }
        else
        {
          const result = this.groupMembers.find(s => s.id === this.entities[event.currentIndex].id);
          if (result == null)
            transferArrayItem(
              event.previousContainer.data,
              event.container.data,
              event.previousIndex,
              event.currentIndex,
            );
        }
      }
    else
      this.message = "Please select a group"
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
      this.dashboardService.saveGroupMembers(this.selectedGroup, members).subscribe(
        responseData => {

        } );
    }
  }
  removeMember(entity: RfidEntity)
  {
    if (this.groupMembers != null)
    {
      let index = this.groupMembers.indexOf(entity);
		  this.groupMembers.splice(index, 1);
      this.dashboardService.removeEntityGroup(entity.id).subscribe(
        responseData => {
          entity.groupId = null;
        } );
    }
  }

}
