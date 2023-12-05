import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConstants } from "../../constants/app.constants";
import { environment } from '../../../environments/environment';
import { License } from "src/app/model/license.model";


@Component({
  selector: 'app-system-license',
  templateUrl: './system-license.component.html',
  styleUrls: ['./system-license.component.css']
})
export class SystemLicenseComponent implements OnInit {

  licenses = new Array();

  constructor(private http:HttpClient) { }

  ngOnInit(): void {
    this.getLicense().subscribe(
      responseData => {
      this.licenses = <any> responseData.body;
      });
  }

  getLicense(){
    return this.http.get(environment.rooturl + AppConstants.LICENSE_API_URL,{ observe: 'response' });
  }
}
