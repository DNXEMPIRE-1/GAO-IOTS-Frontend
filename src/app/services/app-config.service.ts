import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConstants } from "../constants/app.constants";
import { environment } from '../../environments/environment';
import { DashboardService } from '../services/dashboard/dashboard.service';

@Injectable({
  providedIn: 'root'
})
export class AppConfigService {

  public title: string = "GAO IoT System";
  public sub_title: "A cloud based enterprise scale IoT solution";
  constructor(private dashboardService: DashboardService) { }
  load()
  {

  }
}
