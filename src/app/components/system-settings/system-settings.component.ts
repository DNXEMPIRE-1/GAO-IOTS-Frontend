import { Component, OnInit,Output,EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardService } from '../../services/dashboard/dashboard.service';
import { HttpClient } from '@angular/common/http';
import { AppConstants } from "../../constants/app.constants";
import { environment } from '../../../environments/environment';
import { License } from "src/app/model/license.model";

@Component({
  selector: 'app-system-settings',
  templateUrl: './system-settings.component.html',
  styleUrls: ['./system-settings.component.css']
})
export class SystemSettingsComponent implements OnInit {

  @Output() backClick = new EventEmitter();
  viewType = 'userList';
  licenses : string;
  status : string = '';
  constructor(private dashboardService: DashboardService,private router: Router) { }

  ngOnInit(): void {
    this.dashboardService.getLocationTree().subscribe(
      responseData => {
        this.licenses =  <any> responseData.body;
      } ,
      error => {
        this.status = error.message;
      });
  }

  backHome()
  {
    this.backClick.emit();
  }


}
