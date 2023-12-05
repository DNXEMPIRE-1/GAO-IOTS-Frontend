import {Component, EventEmitter, OnInit, Input, Output} from '@angular/core';
import { User } from 'src/app/model/user.model';
import {DashboardService} from "../../services/dashboard/dashboard.service";

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  @Output() backClick = new EventEmitter();
  @Input()   model: User;

  isOldPasswordValid = false;
  isPasswordValid = false;
  passWordMatch = false;
  status: string;
  confirm_password: string;
  constructor(private dashboardService: DashboardService) {
  }

  ngOnInit(): void {
    this.model.password = ''; // enforce user to provide it
  }

  checkPasswordsMatch() {
    this.passWordMatch = this.model.newPassword === this.confirm_password
    if (this.passWordMatch === true)
      this.status ='';
    else if (this.confirm_password != null &&  (this.confirm_password.length > 0))
      this.status ='passwords not match';
  }

  onSubmit() {
    this.status ='';
    this.dashboardService.changePassword(this.model).subscribe(
      responseData => {
        this.onBack();
      },
      error =>{
        this.status = error.error;
      }
    )
  }

  onBack() {
    this.backClick.emit();
  }


}
