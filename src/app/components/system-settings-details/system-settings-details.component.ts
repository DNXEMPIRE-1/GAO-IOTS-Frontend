import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConstants } from "../../constants/app.constants";
import { environment } from '../../../environments/environment';
import { License } from "src/app/model/license.model";

@Component({
  selector: 'app-system-settings-details',
  templateUrl: './system-settings-details.component.html',
  styleUrls: ['./system-settings-details.component.css']
})
export class SystemSettingsDetailsComponent implements OnInit {

  users = new Array();
  viewType = 'userListView';

  constructor(private http:HttpClient) { }

  ngOnInit(): void {
    this.getUsers().subscribe(
      responseData => {
      this.users = <any> responseData.body;
      });
  }

  getUsers(){
    return this.http.get(environment.rooturl + AppConstants.USERS_API_URL,{ observe: 'response' });
  }
  getLicense()
  {
    alert('get license');
  }
}

