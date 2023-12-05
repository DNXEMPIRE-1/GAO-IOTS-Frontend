import { Component, OnInit,Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DashboardService } from '../../services/dashboard/dashboard.service';
import { EntitySearchFormComponent } from '../../forms/entity-search-form/entity-search-form.component';
import { RfidObject } from 'src/app/model/rfidObject.model';
import { Group } from 'src/app/model/group';
@Component({
  selector: 'app-rfid-entities',
  templateUrl: './rfid-entities.component.html',
  styleUrls: ['./rfid-entities.component.css']
})
export class RfidEntitiesComponent implements OnInit {

  @Output() backClick = new EventEmitter();
  public items = new Array ();
  public groups : Group[] = [];
  constructor(private router: Router, private dashboardService: DashboardService,protected dialog: MatDialog) { }

  status: string;
  ngOnInit(): void {
    this.getItems();
  }
  backHome(): void {
    this.backClick.emit();
	}
  refreshGroups()
  {
    this.dashboardService.getGroups(0).subscribe(
      responseData => {
      this.groups =  <any> responseData.body;
      });
  }
  selectItem(item: RfidObject) {

	}

  getItems()
	{
    this.dashboardService.getRfidObjects().subscribe(
      responseData => {
      this.items =  <any> responseData.body;
      },
      error => {
        this.status = error.message;
      });
    this.dashboardService.getGroups(0).subscribe(
        responseData => {
        this.groups =  <any> responseData.body;
        },
        error => {
          this.status = error.message;
        });
	}

}
