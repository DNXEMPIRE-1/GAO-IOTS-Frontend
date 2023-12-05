import { BrowserModule } from '@angular/platform-browser';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { NgModule,APP_INITIALIZER } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClientXsrfModule,HttpClient } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LogoutComponent } from './components/logout/logout.component';
import { AccountComponent } from './components/account/account.component';
import { XhrInterceptor } from './interceptors/app.request.interceptor';
import { AuthActivateRouteGuard } from './routeguards/auth.routeguard';
import { HomeComponent } from './components/home/home.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { SystemSettingsComponent } from './components/system-settings/system-settings.component';
import { SystemUsersComponent } from './components/system-users/system-users.component';
import { SystemSettingsDetailsComponent } from './components/system-settings-details/system-settings-details.component';
import { SystemLicenseComponent } from './components/system-license/system-license.component';
import { RfidObjectsComponent } from './components/rfid-objects/rfid-objects.component';
import { RfidobjectListViewComponent } from './listview/rfidobject-list-view/rfidobject-list-view.component';
import { RfidobjectEditorComponent } from './editor/rfidobject-editor/rfidobject-editor.component';
import { RfidobjectFormComponent } from './forms/rfidobject-form/rfidobject-form.component';
import { OptionValueDialogComponent } from './dialogs/option-value-dialog/option-value-dialog.component';
import { RfidobjAttributeDialogComponent } from './dialogs/rfidobj-attribute-dialog/rfidobj-attribute-dialog.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RfidobjectAttributesFormComponent } from './forms/rfidobject-attributes-form/rfidobject-attributes-form.component';
import {A11yModule} from '@angular/cdk/a11y';
import {CdkAccordionModule} from '@angular/cdk/accordion';
import {ClipboardModule} from '@angular/cdk/clipboard';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {PortalModule} from '@angular/cdk/portal';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {CdkStepperModule} from '@angular/cdk/stepper';
import {CdkTableModule} from '@angular/cdk/table';
import {CdkTreeModule} from '@angular/cdk/tree';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldControl } from '@angular/material/form-field';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatBadgeModule } from '@angular/material/badge';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatStepperModule } from '@angular/material/stepper';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSortModule } from '@angular/material/sort';
import { MatChipsModule } from '@angular/material/chips';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatRadioModule } from '@angular/material/radio';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import {MatDividerModule} from '@angular/material/divider';
import {MatGridListModule} from '@angular/material/grid-list';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RfidEntitiesComponent } from './components/rfid-entities/rfid-entities.component';
import { EntitySearchFormComponent } from './forms/entity-search-form/entity-search-form.component';
import { RfidobjectListView2Component } from './listview/rfidobject-list-view2/rfidobject-list-view2.component';
import { EntityListViewComponent } from './listview/entity-list-view/entity-list-view.component';
import { EntityDialogComponent } from './dialogs/entity-dialog/entity-dialog.component';
import { EntityEditDialogComponent } from './dialogs/entity-edit-dialog/entity-edit-dialog.component';
import { UserListViewComponent } from './listview/user-list-view/user-list-view.component';
import { SystemuserDialogComponent } from './dialogs/systemuser-dialog/systemuser-dialog.component';
import { ConfirmationDialogComponent } from './dialogs/confirmation-dialog/confirmation-dialog.component';
import { TagsComponent } from './components/tags/tags.component';
import { TagDialogComponent } from './dialogs/tag-dialog/tag-dialog.component';
import { LocationsComponent } from './components/locations/locations.component';
import { LocationDialogComponent } from './dialogs/location-dialog/location-dialog.component';
import { DeviceModelsComponent } from './components/device-models/device-models.component';
import { ImageDialogComponent } from './dialogs/image-dialog/image-dialog.component';
import { ParametersComponent } from './components/parameters/parameters.component';
import { ParameterDialogComponent } from './dialogs/parameter-dialog/parameter-dialog.component';
import { LocationSelectionComponent } from './components/location-selection/location-selection.component';
import { LocationImageDialogComponent } from './dialogs/location-image-dialog/location-image-dialog.component';
import { LocationpropsComponent } from './components/locationprops/locationprops.component';
import { LocationpropDialogComponent } from './dialogs/locationprop-dialog/locationprop-dialog.component';
import { DevicemodelDialogComponent } from './dialogs/devicemodel-dialog/devicemodel-dialog.component';
import { AntennaFormComponent } from './forms/antenna-form/antenna-form.component';
import { AntennaDialogComponent } from './dialogs/antenna-dialog/antenna-dialog.component';
import { RfidDevicesComponent } from './components/rfiddevices/rfiddevices.component';
import { DeviceDialogComponent } from './dialogs/device-dialog/device-dialog.component';
import { DeviceModelFormComponent } from './forms/device-model-form/device-model-form.component';
import { EmailsettingsComponent } from './components/emailsettings/emailsettings.component';
import { EmailuserDialogComponent } from './dialogs/emailuser-dialog/emailuser-dialog.component';
import { SmtpServerDialogComponent } from './dialogs/smtp-server-dialog/smtp-server-dialog.component';
import { ReportsComponent } from './components/reports/reports.component';
import { ReportFromComponent } from './forms/report-from/report-from.component';
import { DisplayConfigComponent } from './forms/display-config/display-config.component';
import { TypeofpipePipe } from './pipes/typeofpipe.pipe';
import { TypeofPipe } from './pipes/typeof.pipe';
import { FieldFormatPipe } from './pipes/field-format.pipe';
import { FooterComponent } from './components/footer/footer.component';
import { RereportComponent } from './components/rereport/rereport.component';
import { RtreportComponent } from './components/rtreport/rtreport.component';
import { NgChartsModule } from 'ng2-charts';
import { CalendarDialogComponent } from './dialogs/calendar-dialog/calendar-dialog.component';
import { NgOptimizedImage } from '@angular/common';
import { SchedulesComponent } from './components/schedules/schedules.component'
import {MatTreeModule} from '@angular/material/tree';
import { GroupListViewComponent } from './listview/group-list-view/group-list-view.component';
import { GroupDialogComponent } from './dialogs/group-dialog/group-dialog.component';
import { GroupMembersComponent } from './components/group-members/group-members.component';
import { LocationGroupMembersComponent } from './components/location-group-members/location-group-members.component';
import { WeeklyScheduleComponent } from './components/weekly-schedule/weekly-schedule.component';
import { TimePickerComponent } from './dialogs/time-picker/time-picker.component';
import { AccessSchedulesComponent } from './listview/access-schedules/access-schedules.component';
import { CalendarScheduleDialogComponent } from './dialogs/calendar-schedule-dialog/calendar-schedule-dialog.component';
import {CdkMenuModule} from '@angular/cdk/menu';
import { LocationScheduleViewComponent } from './components/location-schedule-view/location-schedule-view.component';
import { Page403Component } from './components/page403/page403.component';
import { AntennaConfigComponent } from './components/antenna-config/antenna-config.component';
import { MonitorComponent } from './components/monitor/monitor.component';
import { NameFormatPipe } from './pipes/name-format.pipe';
import { SimpleClassNamePipe } from './pipes/simple-class-name.pipe';
import { TestdeviceComponent } from './components/testdevice/testdevice.component';
import { ControlTypeDisplayPipe } from './pipes/control-type-display.pipe';
import { UserGroupListComponent } from './lists/user-group-list/user-group-list.component';
import { UserGroupListViewComponent } from './listview/user-group-list-view/user-group-list-view.component';
import { WeekdayShortNamePipe } from './pipes/weekday-short-name.pipe';
import { PermissionControlsComponent } from './components/permission-controls/permission-controls.component';
import { AssessmentComponent } from './components/assessment/assessment.component';
import { EntityProfileDialogComponent } from './dialogs/entity-profile-dialog/entity-profile-dialog.component';
import { AddEventDialogComponent } from './dialogs/add-event-dialog/add-event-dialog.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { AppConfigService } from './services/app-config.service';

export function initialize(appConfig: AppConfigService) {
  return () => appConfig.load();
}
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    DashboardComponent,
    LogoutComponent,
    AccountComponent,
    HomeComponent,
    UserProfileComponent,
    SystemSettingsComponent,
    SystemUsersComponent,
    SystemSettingsDetailsComponent,
    SystemLicenseComponent,
    RfidObjectsComponent,
    RfidobjectListViewComponent,
    RfidobjectEditorComponent,
    RfidobjectFormComponent,
    OptionValueDialogComponent,
    RfidobjAttributeDialogComponent,
    RfidobjectAttributesFormComponent,
    RfidEntitiesComponent,
    EntitySearchFormComponent,
    RfidobjectListView2Component,
    EntityListViewComponent,
    EntityDialogComponent,
    EntityEditDialogComponent,
    UserListViewComponent,
    SystemuserDialogComponent,
    ConfirmationDialogComponent,
    TagsComponent,
    TagDialogComponent,
    LocationsComponent,
    LocationDialogComponent,
    DeviceModelsComponent,
    ImageDialogComponent,
    ParametersComponent,
    ParameterDialogComponent,
    LocationSelectionComponent,
    LocationImageDialogComponent,
    LocationpropsComponent,
    LocationpropDialogComponent,
    DevicemodelDialogComponent,
    AntennaFormComponent,
    AntennaDialogComponent,
    RfidDevicesComponent,
    DeviceDialogComponent,
    DeviceModelFormComponent,
    EmailsettingsComponent,
    EmailuserDialogComponent,
    SmtpServerDialogComponent,
    ReportsComponent,
    ReportFromComponent,
    DisplayConfigComponent,
    TypeofpipePipe,
    TypeofPipe,
    FieldFormatPipe,
    FooterComponent,
    RereportComponent,
    RtreportComponent,
    CalendarDialogComponent,
    SchedulesComponent,
    GroupListViewComponent,
    GroupDialogComponent,
    GroupMembersComponent,
    LocationGroupMembersComponent,
    WeeklyScheduleComponent,
    TimePickerComponent,
    AccessSchedulesComponent,
    CalendarScheduleDialogComponent,
    LocationScheduleViewComponent,
    Page403Component,
    AntennaConfigComponent,
    MonitorComponent,
    NameFormatPipe,
    SimpleClassNamePipe,
    TestdeviceComponent,
    ControlTypeDisplayPipe,
    UserGroupListComponent,
    UserGroupListViewComponent,
    WeekdayShortNamePipe,
    PermissionControlsComponent,
    AssessmentComponent,
    EntityProfileDialogComponent,
    AddEventDialogComponent,
    ForgetPasswordComponent,
    ResetPasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpClientXsrfModule.withOptions({
      cookieName: 'XSRF-TOKEN',
      headerName: 'X-XSRF-TOKEN',
    }),
    BrowserAnimationsModule,
    MatDialogModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatIconModule,
    MatTableModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatInputModule,
    MatListModule,
    MatCheckboxModule,
    MatMenuModule,
    MatBadgeModule,
    MatTooltipModule,
    MatExpansionModule,
    MatPaginatorModule,
    MatDatepickerModule,
    MatStepperModule,
    MatSidenavModule,
    MatTabsModule,
    MatChipsModule,
    MatTreeModule,
    MatAutocompleteModule,
    MatRadioModule,
    MatProgressSpinnerModule,
    MatNativeDateModule,
    MatSnackBarModule,
    MatRippleModule,
    CdkStepperModule,
    CdkTableModule,
    CdkTreeModule,
    A11yModule,
    CdkAccordionModule,
    CdkMenuModule,
    ClipboardModule,
    DragDropModule,
    PortalModule,
    ScrollingModule,
    MatDividerModule,
    MatGridListModule,
    MatSortModule,
    NgChartsModule,
    NgOptimizedImage

  ],
  providers: [
    {
      provide : HTTP_INTERCEPTORS,
      useClass : XhrInterceptor,
      multi : true
    },
    {
      provide: APP_INITIALIZER,
      useFactory: initialize,
      deps: [AppConfigService],
      multi: true
    },
    AuthActivateRouteGuard

  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}
