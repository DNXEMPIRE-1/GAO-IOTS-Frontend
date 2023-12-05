import { Component, OnInit, Input, } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RfidObject } from 'src/app/model/rfidObject.model';
import { RfidEntity } from 'src/app/model/rfidEntity.model';
import { DashboardService } from '../../services/dashboard/dashboard.service';
import {EntityDialogComponent} from '../../dialogs/entity-dialog/entity-dialog.component'
import { ConfirmationDialogComponent } from 'src/app/dialogs/confirmation-dialog/confirmation-dialog.component';
import { ImageDialogComponent } from '../../dialogs/image-dialog/image-dialog.component';
@Component({
  selector: 'app-entity-list-view',
  templateUrl: './entity-list-view.component.html',
  styleUrls: ['./entity-list-view.component.css']
})
export class EntityListViewComponent implements OnInit {

  public items = new Array<RfidEntity> ();
  @Input()
  rfidObject: RfidObject = new RfidObject;
  constructor(private dashboardService: DashboardService,protected dialog: MatDialog)
  {

  }

  ngOnInit(): void {
      console.log(this.rfidObject.name);
      this.getItems();
  }

  getItems()
	{
    this.dashboardService.getRfidEntitiesByClassId(this.rfidObject.id).subscribe(
      responseData => {
      this.items =  <any> responseData.body;
      });
	}
  createEntity() {

      let dialogRef = this.dialog.open(EntityDialogComponent, {
        width: '600px',
        data: {rfidObject: this.rfidObject}
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result == true)
          this.getItems();
      })
    }
    onDelete(entity: RfidEntity)
    {
      let dialogRef = this.dialog.open(ConfirmationDialogComponent, {
        width: '350px',
       data: 'Are you sure you want to delete?'
      });
      dialogRef.afterClosed().subscribe(result => {
        if (result == true)
          this.deleteEntity(entity);
      })
    }
    deleteEntity(entity: RfidEntity)
    {
      this.dashboardService.deleteRfidEntity(entity.id)
			.subscribe(responseData => {

          this.getItems();


			});
    }
    updateEntity(entity: RfidEntity)
    {
      this.dialog.open(EntityDialogComponent, {
        width: '600px',
        data: {rfidObject: this.rfidObject, entity: entity}
      });
    }
    showImage(entity: RfidEntity)
  {
    this.dialog.open(ImageDialogComponent , {
      data: { name: entity.name, base64: entity.image}
    });
  }
}

