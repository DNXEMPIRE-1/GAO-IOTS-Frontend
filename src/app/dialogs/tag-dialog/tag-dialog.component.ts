import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { MatDialog,MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DashboardService } from '../../services/dashboard/dashboard.service';
import { Tag } from 'src/app/model/tag';
import { RfidEntity } from 'src/app/model/rfidEntity.model';
import { RfidLocation } from 'src/app/model/rfidLocation';
import { LocationSelectionComponent } from 'src/app/components/location-selection/location-selection.component';
import { LocationImageDialogComponent } from '../location-image-dialog/location-image-dialog.component';

@Component({
  selector: 'app-tag-dialog',
  templateUrl: './tag-dialog.component.html',
  styleUrls: ['./tag-dialog.component.css']
})
export class TagDialogComponent implements OnInit {

  selectLocation: boolean = false;
  myControl = new FormControl('');
  options: RfidEntity[];
  filteredOptions: Observable<RfidEntity[]>;
  public showAssignEntity: boolean = false;
  public tag : Tag;
  public entity: RfidEntity;
  public location: RfidLocation;
  constructor(
		public dialogRef: MatDialogRef<TagDialogComponent>,
		@Inject(MAT_DIALOG_DATA) public data: Tag,
    protected dialog: MatDialog,
    private dashboardService: DashboardService
	) {
      this.tag = data;
  }

  ngOnInit(): void {
    if (this.tag.entityId != null)
    {
      this.dashboardService.getRfidEntity(this.tag.entityId).subscribe(responseData => {
        if (responseData.body)
        {
          this.entity = <any>responseData.body;
        }
      })
    }
    if (this.tag.entityId != null)
    {
      this.dashboardService.getLocation(this.tag.entityId).subscribe(responseData => {
        if (responseData.body)
        {
          this.location = <any>responseData.body;
        }
      })
    }
    this.dashboardService.getRfidEntities().subscribe(responseData => {
      if (responseData.body)
        {
           this.options = <any>responseData.body;
           this.filteredOptions = this.myControl.valueChanges.pipe(
            startWith(''),
            map(value => this._filter(value || '')),
          );
        }
    })
  }
  onNoClick(): void {
		this.dialogRef.close(false);
	}

	updateTag() {
    this.dashboardService.updateTag(this.tag)
			.subscribe(responseData => {
				if (responseData.body)
        {
           this.dialogRef.close(true);
        }
			});

	}
  private _filter(value: string): RfidEntity[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.name.toLowerCase().includes(filterValue));
  }
  getSelected(option: RfidEntity)
  {
    this.tag.entityId = option.id;
    this.entity = option;
  }
  onLocationSelected(location: RfidLocation)
  {
    this.location = location;
    this.tag.entityId = location.id;
  }
  showImage(location:RfidLocation)
  {
    this.location = location;
    this.tag.entityId = this.location.id;
    if (location.useParentImage && location.useParentImage === true)
    {
      if (location.parentId)
      {
          this.dashboardService.getLocation(location.parentId).subscribe(
            responseData => {
              let parent: RfidLocation = <any> responseData.body;
              let imgDialogRef = this.dialog.open(LocationImageDialogComponent , {
                data: { location: location, parentImage: parent.image, tag: this.tag}
              });
              const subscribeDialog = imgDialogRef.componentInstance.imagePosition.subscribe((data) => {
                this.tag.x = data.x;
                this.tag.y = data.y;
              });
          }
        )
      }
    }
    else
    {
        let imgDialogRef = this.dialog.open(LocationImageDialogComponent , {

          data: { location: location, tag: this.tag}
        });
        const subscribeDialog = imgDialogRef.componentInstance.imagePosition.subscribe((data) => {
          this.tag.x = data.x;
          this.tag.y = data.y;
        });
    }
  }
  removeLocation()
  {
    this.location = null as any;
    this.tag.entityId = null as any;
  }
  removeEntity()
  {
    this.entity = null as any;
    this.tag.entityId = null as any;
  }
}
