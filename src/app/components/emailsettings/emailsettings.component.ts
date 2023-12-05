import { Component, OnInit } from '@angular/core';
import { Emailuser } from 'src/app/model/emailuser';
import { DashboardService } from '../../services/dashboard/dashboard.service';
import { MatDialog } from '@angular/material/dialog';
import { EmailuserDialogComponent } from 'src/app/dialogs/emailuser-dialog/emailuser-dialog.component';
import { SmtpServerDialogComponent } from 'src/app/dialogs/smtp-server-dialog/smtp-server-dialog.component';
import { ConfirmationDialogComponent } from 'src/app/dialogs/confirmation-dialog/confirmation-dialog.component';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-emailsettings',
  templateUrl: './emailsettings.component.html',
  styleUrls: ['./emailsettings.component.css']
})
export class EmailsettingsComponent implements OnInit {

  columns: string[] = [
    'firstname',
    'lastname',
    'email',
    'registrationDate',
    'action'
  ];



  emailList: Emailuser[] = [];
  status : string = '';
  dataSource?:  MatTableDataSource<any>;
  constructor(private dashboardService: DashboardService,protected dialog: MatDialog) { }

  ngOnInit(): void {

    this.getEmailusers();
  }
  createEmailuser()
  {
    let user: Emailuser = {
      id:'',
      firstname:'',
      lastname: '',
      email: '',
      registrationDate: new Date()
    };


    let dialogRef = this.dialog.open(EmailuserDialogComponent , {
      width: '600px',
      data: user
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result == true)
        this.getEmailusers();
    })
  }
  updateEmailuser(user:Emailuser)
  {
    let dialogRef = this.dialog.open(EmailuserDialogComponent , {
      width: '600px',
      data: user
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result == true)
        this.getEmailusers();
    })
  }
  onDeleteEmailuser(user:Emailuser)
  {
    let dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: 'Are you sure you want to delete?'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result == true)
        this.deleteEmailuser(user);
    })
  }

  getEmailusers()
	{

    this.dashboardService.getEmailusers().subscribe(
      responseData => {
      this.emailList =  <any> responseData.body;
      this.dataSource = new MatTableDataSource(this.emailList);
      },
      error => {
        this.status = error.message;
      },);


	}
  deleteEmailuser(user:Emailuser)
  {
    this.dashboardService.deleteEmailuser(user.id).subscribe(
      result => {
      this.getEmailusers();
      });
  }
  smtpServerConfig()
  {
    let dialogRef = this.dialog.open(SmtpServerDialogComponent , {
      width: '600px'
    });
  }
}
