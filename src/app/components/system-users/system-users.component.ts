import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DashboardService } from '../../services/dashboard/dashboard.service';

@Component({
  selector: 'app-system-users',
  templateUrl: './system-users.component.html',
  styleUrls: ['./system-users.component.css']
})
export class SystemUsersComponent implements OnInit {

  users = new Array();
  status: string;
  constructor(private  dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.dashboardService.getUsers().subscribe(
      responseData => {
      this.users = <any> responseData.body;
      },
      error => {
        this.status = error.message;
      });
  }
}
