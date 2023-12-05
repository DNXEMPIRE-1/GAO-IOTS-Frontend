import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user.model';
import { NgForm } from '@angular/forms';
import { LoginService } from 'src/app/services/login/login.service';
import { Router } from '@angular/router';
import { getCookie } from 'typescript-cookie';
import { environment } from 'src/environments/environment';
import { DashboardService } from '../../services/dashboard/dashboard.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public authStatus: string = '';
  model = new User();
  running: boolean = false;
  panelName: string = 'home';
  formName:  string ='login';
  title: string ="GAO IoT System";
  sub_title: string = "A cloud based enterprise scale IoT solution";

  constructor(private loginService: LoginService,private router: Router,private dashboardService: DashboardService) {
    this.dashboardService.getSystemTitle().subscribe(
      responseData => {
        let temp =  <any> responseData.body;
        if (temp != null && temp.value != null)
          this.title = temp.value;
        this.dashboardService.getSystemSubTitle().subscribe(
          responseData => {
            let temp =  <any> responseData.body;
            if (temp != null && temp.value != null)
              this.sub_title = temp.value;
          } );
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
