import { Component, Inject, OnInit, ViewChild, ElementRef} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DashboardService } from '../../services/dashboard/dashboard.service';
import { RfidLocation } from 'src/app/model/rfidLocation';
import { AppConstants } from 'src/app/constants/app.constants';
import { LocationType } from 'src/app/model/locationType';
import { Group } from 'src/app/model/group';

@Component({
  selector: 'app-group-dialog',
  templateUrl: './group-dialog.component.html',
  styleUrls: ['./group-dialog.component.css']
})
export class GroupDialogComponent implements OnInit {

  public group : Group;
  public parentLocation: RfidLocation;
  public locationTypes: LocationType[];
  public typeString: string = 'Entity Group';

  constructor(
		public dialogRef: MatDialogRef<GroupDialogComponent>,
		@Inject(MAT_DIALOG_DATA) public data: {group: Group, type: number, title: string},
    private dashboardService: DashboardService
	)
  {
    if (data.group != null)
      this.group = data.group;
    else
     this.group = {id:'', type: data.type, name:'', count: 0};
  }

  ngOnInit(): void {
    if (this.group.type == 1)
      this.typeString = 'Location Group';
    this.dashboardService.getLocationTypes().subscribe(result=>
      {
        if (result.body)
        {
          this.locationTypes = <any> result.body;
        }
      })
  }
  onNoClick(): void {
		this.dialogRef.close(false);
	}

	update() {
    this.dashboardService.saveGroup(this.group)
			.subscribe(responseData => {
				if (responseData.body)
        {
           this.dialogRef.close(true);
        }
			});

	}


}

