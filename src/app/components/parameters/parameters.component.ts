import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AppConstants } from "../../constants/app.constants";
import { environment } from '../../../environments/environment';
import { Parameter } from 'src/app/model/parameter';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ParameterDialogComponent } from 'src/app/dialogs/parameter-dialog/parameter-dialog.component';
import { ConfirmationDialogComponent } from 'src/app/dialogs/confirmation-dialog/confirmation-dialog.component';
import { DashboardService } from '../../services/dashboard/dashboard.service';

@Component({
  selector: 'app-parameters',
  templateUrl: './parameters.component.html',
  styleUrls: ['./parameters.component.css']
})
export class ParametersComponent implements OnInit {

  parameters = new Array();
  status: string;

  constructor(private router: Router,private dashboardService: DashboardService, protected dialog: MatDialog) { }

  ngOnInit(): void {
    this.dashboardService.getParameters().subscribe(
      responseData => {
      this.parameters = <any> responseData.body;
      },
      error => {
        this.status = error.message;
      });
  }

  newParameter()
  {
    let parameter: Parameter = {
      id:'',
      name:'',
      value: '',
      values: []
    };

    let dialogRef = this.dialog.open(ParameterDialogComponent , {
      width: '600px',
      data: parameter
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result == true)
        this.dashboardService.getParameters().subscribe(
          responseData => {
          this.parameters = <any> responseData.body;
          });
    })
  }
  updateParameter(parameter: Parameter)
  {
    let dialogRef = this.dialog.open(ParameterDialogComponent , {
      width: '600px',
      data: parameter
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result == true)
        this.dashboardService.getParameters().subscribe(
          responseData => {
          this.parameters = <any> responseData.body;
          });
    })
  }
  onDeleteParameter(parameter: Parameter)
  {
    let dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
      data: 'Are you sure you want to delete the parameter ' + parameter.name +  '?'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result == true)
        this.deleteParameter(parameter);
    })
  }
  deleteParameter(parameter: Parameter)
  {
    this.dashboardService.deleteParameter(parameter.id).subscribe(
      responseData => {
        this.dashboardService.getParameters().subscribe(
          responseData => {
          this.parameters = <any> responseData.body;
          });
      });
  }

}
