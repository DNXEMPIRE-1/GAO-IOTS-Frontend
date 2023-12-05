import { Component, Inject, OnInit } from '@angular/core';
import { RfidEntity } from 'src/app/model/rfidEntity.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DashboardService } from '../../services/dashboard/dashboard.service';
import { Group } from 'src/app/model/group';

@Component({
  selector: 'app-entity-profile-dialog',
  templateUrl: './entity-profile-dialog.component.html',
  styleUrls: ['./entity-profile-dialog.component.css']
})
export class EntityProfileDialogComponent implements OnInit {

  entity: RfidEntity;
  group: Group;
  constructor(public dialogRef: MatDialogRef<EntityProfileDialogComponent>,
    private dashboardService: DashboardService,
    @Inject(MAT_DIALOG_DATA) public data: {entity: RfidEntity})
    {
      this.entity = data.entity;
    }

  ngOnInit(): void {
    if (this.entity.groupId)
    {
      this.dashboardService.getGroupById(this.entity.groupId).subscribe(
        responseData => {
          this.group = <any> responseData.body;
        }
      )
    }
  }

  onNoClick(): void {
		this.dialogRef.close(false);
	}
}
