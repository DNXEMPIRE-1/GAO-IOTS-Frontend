import {Component, OnInit,Output, Input, EventEmitter} from '@angular/core';
import {User} from 'src/app/model/user.model';
import {NgForm} from '@angular/forms';
import { DashboardService } from '../../services/dashboard/dashboard.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {

  public authStatus: string = '';
  @Output()
  formName = new EventEmitter<string>();
  @Input()
  public emailAddress: string = ''

  constructor(private dashboardService: DashboardService) {
  }

  ngOnInit(): void {

  }

  validateEmail(): boolean {
    console.log(this.emailAddress)
    this.dashboardService.findAccountByEmail(this.emailAddress).subscribe(
      responseData => {
        this.authStatus = <any> responseData.body;
        return true;
      },
      errors => {
        this.authStatus = errors.error;
        return false;
      }
    )
      return false;
  }
  sendEmail()
  {
    this.authStatus = '';
    if (this.validateEmail() == true)
    {
      ;
    }
  }
}

