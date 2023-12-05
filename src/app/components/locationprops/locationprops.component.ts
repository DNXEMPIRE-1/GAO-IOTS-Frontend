import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AppConstants } from "../../constants/app.constants";
import { environment } from '../../../environments/environment';
import { LocationType } from 'src/app/model/locationType';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { LocationpropDialogComponent } from 'src/app/dialogs/locationprop-dialog/locationprop-dialog.component';
import { ConfirmationDialogComponent } from 'src/app/dialogs/confirmation-dialog/confirmation-dialog.component';
import { DashboardService } from 'src/app/services/dashboard/dashboard.service';

@Component({
  selector: 'app-locationprops',
  templateUrl: './locationprops.component.html',
  styleUrls: ['./locationprops.component.css']
})
export class LocationpropsComponent implements OnInit {

  locationTypes: LocationType[];
  status: string;

  constructor(private http:HttpClient,private router: Router, protected dialog: MatDialog, private dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.dashboardService.getLocationTypes().subscribe(
      responseData => {
      this.locationTypes = <any> responseData.body;
      },
      error => {
        this.status = error.message;
      });
  }


  newType()
  {
    let locationType: LocationType = {
      id:'',
      name:'',
      createDate: new Date(),
      attributes: []
    };

    let dialogRef = this.dialog.open(LocationpropDialogComponent , {
      width: '600px',
      data: locationType
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result == true)
        this.dashboardService.getLocationTypes().subscribe(
          responseData => {
          this.locationTypes = <any> responseData.body;
          });
    })
  }
  updateLocationType(locationType: LocationType)
  {
    let dialogRef = this.dialog.open(LocationpropDialogComponent , {
      width: '600px',
      data: locationType
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result == true)
        this.dashboardService.getLocationTypes().subscribe(
          responseData => {
          this.locationTypes = <any> responseData.body;
          });
    })
  }
  onDeleteLocationType(locationType: LocationType)
  {
    let dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
      data: 'Are you sure you want to delete the location type ' + locationType.name +  '?'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result == true)
        this.deleteLocationType(locationType);
    })
  }
  deleteLocationType(locationType: LocationType)
  {
    this.http.delete(environment.rooturl + AppConstants.LOCATIONPROPS_API_URL + '/'+ locationType.id,{ observe: 'response' }).subscribe(
      responseData => {
        this.dashboardService.getLocationTypes().subscribe(
          responseData => {
          this.locationTypes = <any> responseData.body;
          });
      });
  }
  backHome()
  {
    this.router.navigate(['systemSettings']);
  }
}
