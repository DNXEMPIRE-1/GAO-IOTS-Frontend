import { HttpResponse, HttpClient } from "@angular/common/http";
import { Component, OnInit } from '@angular/core';
import { RfidObject } from 'src/app/model/rfidObject.model';
import { EntityAttribute } from 'src/app/model/entityAttribute.model';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DashboardService } from '../../services/dashboard/dashboard.service';
import { ConfirmationDialogComponent } from 'src/app/dialogs/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-rfid-objects',
  templateUrl: './rfid-objects.component.html',
  styleUrls: ['./rfid-objects.component.css']
})
export class RfidObjectsComponent implements OnInit {
  rfidObjectList = ['obj1','obj2'];
  constructor(private router: Router, private dashboardService: DashboardService,protected dialog: MatDialog) { }
  public topic : string = "default";
  public items = new Array ();
  public selectedItem!: RfidObject;
  public newItem!: RfidObject;
  status: string;
  ngOnInit(): void {
    this.getItems();
		this.topic = "default";

  }

  onAddRFIDObject() {

  }

  createEntity(): RfidObject {
    this.topic = "new";
    this.newItem =  {
			id: '',
			name: "",
			entityCount: 0,
      createDate: new Date(),
			attributes: new Array<EntityAttribute>
		};
    return this.newItem;
	}
  backHome(): void {
		this.router.navigate(['systemSettings']);
	}
  getEntity(item: RfidObject) {
		this.dashboardService.getRfidObject(item.id).subscribe(
      responseData => {
        this.selectedItem  =  <any> responseData.body;
      });
	}
  selectItem(item: RfidObject) {
    this.dashboardService.getRfidObject(item.id).subscribe(
      responseData => {
        this.selectedItem  =  <any> responseData.body;
        this.topic = "editing";
      });
	}

  removeItem(item: RfidObject) {
    let dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: 'Are you sure you want to delete?'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result == true)
      {
        this.dashboardService.deleteRfidObject(item.id).subscribe(
          responseData => {
            this.getItems();
            });
      }
    })
  }

	getItems()
	{
    this.dashboardService.getRfidObjects().subscribe(
      responseData => {
      this.items =  <any> responseData.body;
      this.topic = "default";
      },
      error => {
        this.status = error.message;
      });
	}

  discardUpdate() {
		this.topic = "default";
	}
  update() {
		this.dashboardService.updateRfidObject(this.selectedItem)
			.subscribe(responseData => {
				this.getItems();
			});
	}
  create() {
		this.dashboardService.createRfidObject(this.newItem)
			.subscribe(responseData => {
				if (responseData.body)
          this.getItems();

			});
	}

}
