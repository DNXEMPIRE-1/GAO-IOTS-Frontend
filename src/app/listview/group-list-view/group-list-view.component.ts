import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Group } from 'src/app/model/group';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { GroupDialogComponent } from 'src/app/dialogs/group-dialog/group-dialog.component';
import { DashboardService } from '../../services/dashboard/dashboard.service';
import { ConfirmationDialogComponent } from 'src/app/dialogs/confirmation-dialog/confirmation-dialog.component';
@Component({
  selector: 'app-group-list-view',
  templateUrl: './group-list-view.component.html',
  styleUrls: ['./group-list-view.component.css']
})
export class GroupListViewComponent implements OnInit {

  constructor(protected dialog: MatDialog,private dashboardService: DashboardService) { };

  selected: Group;
  @Input() groups: Group[];
  @Input() groupType: number = 0;

  title: string;

  @Output()
  newCreated = new EventEmitter;

  ngOnInit(): void {
    this.title = "Entity Group Management";
    if (this.groupType == 1)
      this.title = "Location Group Management";
  }

  update(group: Group)
  {

    let dialogRef = this.dialog.open(GroupDialogComponent , {
      width: '600px',
      data: {group: group, type: this.groupType, title: this.title}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result == true)
        this.newCreated.emit();
    })
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

  newGroup()
  {
    let group: Group = {id:'',name:'', type:this.groupType, count:0};
    this.update(group);
  }
}
