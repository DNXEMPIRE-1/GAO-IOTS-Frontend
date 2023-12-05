import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LogoutComponent } from './components/logout/logout.component';
import { AccountComponent } from '../app/components/account/account.component';
import { RfidDevicesComponent } from '../app/components/rfiddevices/rfiddevices.component';
import { RfidEntitiesComponent } from './components/rfid-entities/rfid-entities.component';
import { AuthActivateRouteGuard } from './routeguards/auth.routeguard';
import { HomeComponent } from './components/home/home.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { SystemSettingsComponent } from './components/system-settings/system-settings.component';
import { SystemUsersComponent } from './components/system-users/system-users.component';
import { RfidObjectsComponent } from './components/rfid-objects/rfid-objects.component';
import { EntityListViewComponent } from './listview/entity-list-view/entity-list-view.component';
import { TagsComponent } from './components/tags/tags.component';
import { LocationsComponent } from './components/locations/locations.component';
import { DeviceModelsComponent } from './components/device-models/device-models.component';
import { ParametersComponent} from './components/parameters/parameters.component'
import { LocationpropsComponent } from './components/locationprops/locationprops.component';
import { EmailsettingsComponent } from './components/emailsettings/emailsettings.component';
import { SchedulesComponent } from './components/schedules/schedules.component';
import { Page403Component } from './components/page403/page403.component';
import {ResetPasswordComponent} from "./components/reset-password/reset-password.component";

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent},
  { path: 'page403', component: Page403Component},
  { path: 'login', component: HomeComponent},
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthActivateRouteGuard]},
  {path: 'changePassword', component: ResetPasswordComponent, canActivate: [AuthActivateRouteGuard]},
  { path: 'logout', component: LogoutComponent},
  { path: 'locations', component: LocationsComponent, canActivate: [AuthActivateRouteGuard]},
  { path: 'parameters', component: ParametersComponent, canActivate: [AuthActivateRouteGuard]},
  { path: 'entityList', component: EntityListViewComponent, canActivate: [AuthActivateRouteGuard]},
  { path: 'rfidentities', component: RfidEntitiesComponent, canActivate: [AuthActivateRouteGuard]},
  { path: 'userProfile', component: UserProfileComponent, canActivate: [AuthActivateRouteGuard]},
  { path: 'systemSettings', component: SystemSettingsComponent, canActivate: [AuthActivateRouteGuard]},
  { path: 'systemUsers', component: SystemUsersComponent, canActivate: [AuthActivateRouteGuard]},
  { path: 'rfidobjects', component: RfidObjectsComponent, canActivate: [AuthActivateRouteGuard]},
  { path: 'tags', component: TagsComponent, canActivate: [AuthActivateRouteGuard]},
  { path: 'devicemodels', component: DeviceModelsComponent, canActivate: [AuthActivateRouteGuard]},
  { path: 'locationprops', component: LocationpropsComponent, canActivate: [AuthActivateRouteGuard]},
  { path: 'rfiddevices', component: RfidDevicesComponent, canActivate: [AuthActivateRouteGuard]},
  { path: 'emailsettings', component: EmailsettingsComponent, canActivate: [AuthActivateRouteGuard]},
  { path: 'schedules', component: SchedulesComponent, canActivate: [AuthActivateRouteGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
