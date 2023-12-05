import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { User } from 'src/app/model/user.model';
import { DashboardService } from '../../services/dashboard/dashboard.service';
import {DashboardComponent} from "../dashboard/dashboard.component";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  @Output() backClick = new EventEmitter();
  user = new User();
  constructor(private dashboardService: DashboardService,private dashboardComponent: DashboardComponent) { }

  ngOnInit(): void {
    this.user = JSON.parse(sessionStorage.getItem('userdetails')!);
  }
  onUpdate()
  {
    this.dashboardService.updateUser(this.user).subscribe(responseData => {
      window.sessionStorage.setItem("userdetails",JSON.stringify(this.user));
      console.log('user updated');
    })
  }
  panelName = (name: string) =>{
    this.dashboardComponent.setPanelName(name)
  }

  onBack()
  {
    this.backClick.emit();
	}
}
