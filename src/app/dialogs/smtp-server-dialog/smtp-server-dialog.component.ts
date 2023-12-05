import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import {Observable} from 'rxjs';
import {map, refCount, startWith} from 'rxjs/operators';
import { MatDialog,MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DashboardService } from '../../services/dashboard/dashboard.service';
import { SmtpSetting } from 'src/app/model/smtpsetting';
import { SmtpAuthMethod, SmtpProtocol } from 'src/app/constants/fieldtypes.constants';
import { SmtpAuthMethodOption, SmtpOptions, SmtpProtocolOption } from 'src/app/model/smtpOptions';

@Component({
  selector: 'app-smtp-server-dialog',
  templateUrl: './smtp-server-dialog.component.html',
  styleUrls: ['./smtp-server-dialog.component.css']
})
export class SmtpServerDialogComponent implements OnInit {

  public smtpSetting: SmtpSetting;
  public authMethods: SmtpAuthMethodOption[];
  public protocols: SmtpProtocolOption[];
  public testemail: string;
  public status: string;

  constructor(
		public dialogRef: MatDialogRef<SmtpServerDialogComponent>,
    protected dialog: MatDialog,
    private dashboardService: DashboardService
	) {
      let options: SmtpOptions = new SmtpOptions();
      this.authMethods = options.getAuthMethodList();
      this.protocols   = options.getProtocolList();
      this.smtpSetting = {id:'',server:'',username:'',password:'',registrationDate: new Date(),
                port:25, authMethod: SmtpAuthMethod.NONE,protocol: SmtpProtocol.NONE};
  }

  ngOnInit(): void {
    this.dashboardService.getSmtpSetting().subscribe(
      responseData => {
        if (responseData.body != null)
          this.smtpSetting =  <any> responseData.body;
      });

  }
  onNoClick(): void {
		this.dialogRef.close(false);
	}

  validateSmtpSetting() : boolean
  {
    let rc: boolean = false;
    if (this.smtpSetting.server.length > 0)
    {
      if (this.smtpSetting.authMethod === SmtpAuthMethod.PASSWORD || this.smtpSetting.authMethod === SmtpAuthMethod.ENCRYPTED_PASSWORD)
      {
          if (this.smtpSetting.username.length > 0 && this.smtpSetting.password.length > 0)
            rc = true;
      }
      else
        rc = true;
    }

    return rc;
  }
	updateSmtpSetting() {
    if (this.validateSmtpSetting())
    {
    this.dashboardService.updateSmtpSetting(this.smtpSetting)
			.subscribe(responseData => {
				if (responseData.body)
        {
           this.dialogRef.close(true);
        }
			});
    }
	}
  removeSmtpSetting()
  {
    this.dashboardService.deleteSmtpSetting(this.smtpSetting.id)
    .subscribe(responseData => {

         this.dialogRef.close(true);

    });
  }
  sendTestEmail()
  {
    this.status = null as any;
    if (this.validateSmtpSetting() && this.testemail != null)
    {
      this.smtpSetting.testemail = this.testemail;
      this.dashboardService.sendTestEmail(this.smtpSetting)
			.subscribe(responseData => {

			},
        error => {                              //Error callback
          if (error.status != 200)
            this.status  = error.error;
          else
            this.status = "test email send...";
        }
      );
    }
  }
}
