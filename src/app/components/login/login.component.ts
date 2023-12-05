import { Component, OnInit } from '@angular/core';
import { User } from "src/app/model/user.model";
import { NgForm } from '@angular/forms';
import { LoginService } from 'src/app/services/login/login.service';
import { Router } from '@angular/router';
import { getCookie } from 'typescript-cookie';
import { DashboardService } from '../../services/dashboard/dashboard.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public authStatus: string = '';
  model = new User();
  running: boolean = false;
  title: string ="GAO IoT System";


  constructor(private loginService: LoginService, private router: Router,private dashboardService: DashboardService) {
    this.dashboardService.getParameterByName('SYSTEM_TITLE').subscribe(
      responseData => {
        let temp =  <any> responseData.body;
        if (temp != null && temp.value != null)
          this.title = temp.value;
      } );
   }

  ngOnInit(): void {

  }

  validateUser(loginForm: NgForm) {
    this.loginService.validateLoginDetails(this.model).subscribe(
      responseData => {
        window.sessionStorage.setItem("Authorization",responseData.headers.get('Authorization')!);
        this.model = <any> responseData.body;
        this.model.authStatus = 'AUTH';
        window.sessionStorage.setItem("userdetails",JSON.stringify(this.model));
        let xsrf = getCookie('XSRF-TOKEN')!;
        window.sessionStorage.setItem("XSRF-TOKEN",xsrf);
        this.router.navigate(['dashboard']);
      },
      error => {
        this.authStatus = error.message;
      },
      () => {
        // 'onCompleted' callback.
        // No errors, route to new page here
      });

  }

}
