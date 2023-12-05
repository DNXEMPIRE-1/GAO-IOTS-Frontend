import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user.model';
import { DashboardService } from '../../services/dashboard/dashboard.service';
import { MatDialog } from '@angular/material/dialog';
import { SystemuserDialogComponent } from 'src/app/dialogs/systemuser-dialog/systemuser-dialog.component';
import { ConfirmationDialogComponent } from 'src/app/dialogs/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-user-list-view',
  templateUrl: './user-list-view.component.html',
  styleUrls: ['./user-list-view.component.css']
})
export class UserListViewComponent implements OnInit {

  userList: Array<User> = [];
  system_roles: string[] = [];
  draggingRole: string;
  status: string;
  constructor(private dashboardService: DashboardService,protected dialog: MatDialog) { }

  ngOnInit(): void {
    this.getUsers();
    this.getRoles();
  }
  getRoles()
  {
    this.dashboardService.getParameterByName('SYSTEM_ROLES').subscribe(
      responseData => {
        let temp =  <any> responseData.body;
        if (temp != null && temp.values != null)
          this.system_roles = temp.values;
      } );
  }
  createUser()
  {
    let user: User = new User();
    user.addTime = new Date();

    let dialogRef = this.dialog.open(SystemuserDialogComponent , {
      width: '600px',
      data: user
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result == true)
        this.getUsers();
    })
  }
  updateUser(user:User)
  {
    let dialogRef = this.dialog.open(SystemuserDialogComponent , {
      width: '600px',
      data: user
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result == true)
        this.getUsers();
    })
  }
  onDeleteUser(user:User)
  {
    let dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: 'Are you sure you want to delete?'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result == true)
        this.deleteUser(user);
    })
  }
  getUsers()
	{
    this.dashboardService.getSystemUsers().subscribe(
      responseData => {
      this.userList =  <any> responseData.body;
      },
      error => {
        this.status = error.message;
      });
	}
  deleteUser(user: User)
  {
    this.dashboardService.deleteSystemUser(user.id).subscribe(
      result => {
      this.getUsers();
      });
  }
  drag(role: string) {
    this.draggingRole = role;
  }
  allowDrop(event: Event)
  {
    event.preventDefault();
  }
  drop(event: Event, user: User) {
    event.preventDefault();
    if (this.draggingRole != null)
    {
      if (user.authorities == null)
        user.authorities = [];
      const role = user.authorities.find(s=>s === this.draggingRole)
      if (role == null)
      {
        user.authorities.push(this.draggingRole);
        this.dashboardService.updateUser(user).subscribe(responseData => {
				if (responseData.body)
        {
          this.getUsers();
        }
			});
      }
    }
    this.draggingRole = null!;
  }
}
