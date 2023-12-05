import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConstants } from "../../constants/app.constants";
import { environment } from '../../../environments/environment';
import { User } from '../../model/user.model';
import { Contact } from '../../model/contact.model';
import { RfidObject } from 'src/app/model/rfidObject.model';
import { RfidEntity } from 'src/app/model/rfidEntity.model';
import { Tag } from 'src/app/model/tag';
import { RfidLocation } from 'src/app/model/rfidLocation';
import { RfidDevice } from 'src/app/model/rfidDevice';
import { RfidDeviceModel } from 'src/app/model/rfidDeviceModel';
import { Parameter } from 'src/app/model/parameter';
import { LocationType } from 'src/app/model/locationType';
import { Emailuser } from 'src/app/model/emailuser';
import { SmtpSetting } from 'src/app/model/smtpsetting';
import { Group } from 'src/app/model/group';
import { Schedule } from 'src/app/model/schedule';
import { GroupMembers } from 'src/app/model/group_members';
import { AccessHistory } from 'src/app/model/access-history';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http:HttpClient) { }

  getAccountDetails(id: string){
    return this.http.get(environment.rooturl + AppConstants.ACCOUNT_API_URL + "?id="+id,{ observe: 'response',withCredentials: true });
  }
  getParameterByName(name: string){
    return this.http.get(environment.rooturl + AppConstants.PARAMETERBYNAME_API_URL + "/"+name,{ observe: 'response',withCredentials: true });
  }
  updateUser(user: User){
    return this.http.post(environment.rooturl + AppConstants.USERS_API_URL, user, { observe: 'response',withCredentials: true });
  }
  updateSmtpSetting(smtpSetting: SmtpSetting){
    return this.http.post(environment.rooturl + AppConstants.SMTPSETTINGS_API_URL, smtpSetting, { observe: 'response',withCredentials: true });
  }
  deleteSmtpSetting(id: string)
  {
    return this.http.delete(environment.rooturl + AppConstants.SMTPSETTINGS_API_URL+'/'+id, { observe: 'response',withCredentials: true });
  }
  getSmtpSetting(){
    return this.http.get(environment.rooturl + AppConstants.SMTPSETTINGS_API_URL, { observe: 'response',withCredentials: true });
  }
  updateTag(tag: Tag){
    return this.http.post(environment.rooturl + AppConstants.TAGS_API_URL, tag, { observe: 'response',withCredentials: true });
  }
  updateLocation(location: RfidLocation){
    return this.http.post(environment.rooturl + AppConstants.LOCATIONS_API_URL, location, { observe: 'response',withCredentials: true });
  }
  deleteSystemUser(id: string){
    return this.http.delete(environment.rooturl + AppConstants.USERS_API_URL+'/'+id, { observe: 'response',withCredentials: true });
  }
  deleteTag(id: string){
    return this.http.delete(environment.rooturl + AppConstants.TAGS_API_URL+'/'+id, { observe: 'response',withCredentials: true });
  }
  deleteEmailuser(id:string)
  {
    return this.http.delete(environment.rooturl + AppConstants.EMAILUSERS_API_URL+'/'+id, { observe: 'response',withCredentials: true });
  }
  getEmailusers(){
    return this.http.get(environment.rooturl + AppConstants.EMAILUSERS_API_URL, { observe: 'response',withCredentials: true });
  }
  getEmailuser(id: string){
    return this.http.get(environment.rooturl + AppConstants.EMAILUSERS_API_URL+'/'+id, { observe: 'response',withCredentials: true });
  }
  updateEmailuser(emailuser: Emailuser){
    return this.http.post(environment.rooturl + AppConstants.EMAILUSERS_API_URL, emailuser, { observe: 'response',withCredentials: true });
  }
  getLocationTags(id: string){
    return this.http.get(environment.rooturl + AppConstants.LOCATION_TAGS_API_URL+'/'+id, { observe: 'response',withCredentials: true });
  }
  getLocationDevices(id: string){
    return this.http.get(environment.rooturl + AppConstants.LOCATION_DEVICES_API_URL+'/'+id, { observe: 'response',withCredentials: true });
  }
  getLocationAntennas(id: string){
    return this.http.get(environment.rooturl + AppConstants.LOCATION_ANTENNAS_API_URL+'/'+id, { observe: 'response',withCredentials: true });
  }
  deleteLocation(id: string){
    return this.http.delete(environment.rooturl + AppConstants.LOCATIONS_API_URL+'/'+id, { observe: 'response',withCredentials: true });
  }
  deleteGroup(id: string){
    return this.http.delete(environment.rooturl + AppConstants.GROUPS_API_URL+'/'+id, { observe: 'response',withCredentials: true });
  }
  getRfidEntitiesByClassId(id: string)
  {
    return this.http.get(environment.rooturl + AppConstants.RFIDENTITY_API_BYCLASS_URL + "/" + id,{ observe: 'response',withCredentials: true });
  }
  getRfidEntities()
  {
    return this.http.get(environment.rooturl + AppConstants.RFIDENTITY_API_URL,{ observe: 'response',withCredentials: true });
  }
  getGroups(type: number)
  {
    return this.http.get(environment.rooturl + AppConstants.GROUPS_API_URL + "/" + type,{ observe: 'response',withCredentials: true });
  }
  getGroupById(groupId: string)
  {
    return this.http.get(environment.rooturl + AppConstants.GROUP_BY_ID_API_URL + "/" + groupId,{ observe: 'response',withCredentials: true });
  }
  getGroupEntities(id: string)
  {
    return this.http.get(environment.rooturl + AppConstants.GROUP_ENTITIES_API_URL + "/" + id,{ observe: 'response',withCredentials: true });
  }
  getGroupLocations(id: string)
  {
    return this.http.get(environment.rooturl + AppConstants.GROUP_LOCATIONS_API_URL + "/" + id,{ observe: 'response',withCredentials: true });
  }
  getChartData(period: number)
  {
    return this.http.get(environment.rooturl + AppConstants.CHARTS_API_URL + "/" + period,{ observe: 'response',withCredentials: true });
  }
  getLocationChartData(period: number, id: string)
  {
    return this.http.get(environment.rooturl + AppConstants.CHARTS_API_URL + "/" + period + "/" + id,{ observe: 'response',withCredentials: true });
  }
  getRfidEntitiy(id: string)
  {
    return this.http.get(environment.rooturl + AppConstants.RFIDENTITY_API_URL + "/" + id,{ observe: 'response',withCredentials: true });
  }
  removeLocationGroup(locationId: string)
  {
    return this.http.delete(environment.rooturl + AppConstants.LOCATION_REMOVEGROUP_API_URL + "/" + locationId,{ observe: 'response',withCredentials: true });
  }
  removeEntityGroup(entityId: string)
  {
    return this.http.delete(environment.rooturl + AppConstants.RFIDENTITY_REMOVEGROUP_API_URL + "/" + entityId,{ observe: 'response',withCredentials: true });
  }
  deleteRfidEntity(id: string)
  {
    return this.http.delete(environment.rooturl + AppConstants.RFIDENTITY_API_URL + "/" + id,{ observe: 'response',withCredentials: true });
  }
  createRfidEntity(rfidEntity:RfidEntity){
    return this.http.post(environment.rooturl + AppConstants.RFIDENTITY_API_URL,rfidEntity,{ observe: 'response', withCredentials: true});
  }
  getRfidDeviceModels(){
    return this.http.get(environment.rooturl + AppConstants.DEVICEMODELS_API_URL,{ observe: 'response',withCredentials: true });
  }
  getRfidObjects(){
    return this.http.get(environment.rooturl + AppConstants.RFIDOBJECT_API_URL,{ observe: 'response',withCredentials: true });
  }
  getLocations(){
    return this.http.get(environment.rooturl + AppConstants.LOCATIONS_API_URL,{ observe: 'response',withCredentials: true });
  }
  getMonitoredLocations(){
    return this.http.get(environment.rooturl + AppConstants.MONITORED_LOCATIONS_API_URL,{ observe: 'response',withCredentials: true });
  }
  getParameters(){
    return this.http.get(environment.rooturl + AppConstants.PARAMETERS_API_URL,{ observe: 'response',withCredentials: true });
  }
  deleteParameter(id: string)
  {
    return this.http.delete(environment.rooturl + AppConstants.PARAMETERS_API_URL + "/" + id,{ observe: 'response',withCredentials: true });
  }
  getLocationTree(){
    return this.http.get(environment.rooturl + AppConstants.LOCATION_TREE_API_URL,{ observe: 'response',withCredentials: true });
  }
  getLocationSubtree(id:string){
    return this.http.get(environment.rooturl + AppConstants.LOCATION_TREE_API_URL + '/' + id,{ observe: 'response',withCredentials: true });
  }
  getLocation(id: string){
    return this.http.get(environment.rooturl + AppConstants.LOCATIONS_API_URL +'/'+id,{ observe: 'response',withCredentials: true });
  }
  getChildrenLocations(id: string){
    return this.http.get(environment.rooturl + AppConstants.LOCATIONS_CHILDREN_API_URL+'/'+id,{ observe: 'response',withCredentials: true });
  }
  getRfidObject(id: string){
    return this.http.get(environment.rooturl + AppConstants.RFIDOBJECT_API_URL+"/"+id,{ observe: 'response',withCredentials: true });
  }
  getRfidEntity(id: string){
    return this.http.get(environment.rooturl + AppConstants.RFIDENTITY_API_URL+"/"+id,{ observe: 'response',withCredentials: true });
  }
  getRfidDeviceModel(id: string){
    return this.http.get(environment.rooturl + AppConstants.DEVICEMODELS_API_URL+"/"+id,{ observe: 'response',withCredentials: true });
  }
  deleteRfidObject(id:string){
    return this.http.delete(environment.rooturl + AppConstants.RFIDOBJECT_API_URL +"/"+id,{ observe: 'response',withCredentials: true });
  }
  deleteRfidDeviceModel(id:string){
    return this.http.delete(environment.rooturl + AppConstants.DEVICEMODELS_API_URL +"/"+id,{ observe: 'response',withCredentials: true });
  }
  createRfidObject(rfidObj:RfidObject){
    return this.http.post(environment.rooturl + AppConstants.RFIDOBJECT_API_URL,rfidObj,{ observe: 'response', withCredentials: true});
  }
  createRfidDeviceModel(rfidObj:RfidDeviceModel){
    return this.http.post(environment.rooturl + AppConstants.DEVICEMODELS_API_URL,rfidObj,{ observe: 'response', withCredentials: true});
  }
  updateRfidObject(rfidObj:RfidObject){
    return this.http.post(environment.rooturl + AppConstants.RFIDOBJECT_API_URL,rfidObj,{ observe: 'response', withCredentials: true});
  }
  updateRfidDeviceModel(deviceModel:RfidDeviceModel){
    return this.http.post(environment.rooturl + AppConstants.DEVICEMODELS_API_URL,deviceModel,{ observe: 'response', withCredentials: true});
  }
  updateParameter(parameter:Parameter){
    return this.http.post(environment.rooturl + AppConstants.PARAMETERS_API_URL,parameter,{ observe: 'response', withCredentials: true});
  }
  getSystemUsers(){
    return this.http.get(environment.rooturl + AppConstants.USERS_API_URL,{ observe: 'response', withCredentials: true});
  }
  getTags(){
    return this.http.get(environment.rooturl + AppConstants.TAGS_API_URL,{ observe: 'response',withCredentials: true });
  }
  getTagPage(pageIndex:number, pageSize:number){
    return this.http.get(environment.rooturl + AppConstants.TAGS_API_URL + "/" + pageIndex + "/" + pageSize,{ observe: 'response',withCredentials: true });
  }
  getRfidDevices(){
    return this.http.get(environment.rooturl + AppConstants.RFIDDEVICES_API_URL,{ observe: 'response',withCredentials: true });
  }
  getDeviceDrivers(){
    return this.http.get(environment.rooturl + AppConstants.RFIDDEVICES_DRIVERS_API_URL,{ observe: 'response',withCredentials: true });
  }
  getRfidDeviceStatus(id: string){
    return this.http.get(environment.rooturl + AppConstants.RFIDDEVICES_STATUS_API_URL + "/" + id,{ observe: 'response',withCredentials: true });
  }
  setRfidDeviceGPO(id: string, high: boolean)
  {
    return this.http.post(environment.rooturl + AppConstants.RFIDDEVICES_SETGPO_API_URL + "/" + id + "/" + high,{ observe: 'response',withCredentials: true });
  }
  deleteRfidDevice(id:string){
    return this.http.delete(environment.rooturl + AppConstants.RFIDDEVICES_API_URL +"/"+id,{ observe: 'response',withCredentials: true });
  }
  getLocationTypes(){
    return this.http.get(environment.rooturl + AppConstants.LOCATIONPROPS_API_URL,{ observe: 'response',withCredentials: true });
  }
  getLocationType(id: string){
    return this.http.get(environment.rooturl + AppConstants.LOCATIONPROPS_API_URL + '/' + id,{ observe: 'response',withCredentials: true });
  }
  updateLocationType(locationType:LocationType){
    return this.http.post(environment.rooturl + AppConstants.LOCATIONPROPS_API_URL,locationType,{ observe: 'response', withCredentials: true});
  }
  updateRfidDevice(device:RfidDevice){
    return this.http.post(environment.rooturl + AppConstants.RFIDDEVICES_API_URL,device,{ observe: 'response', withCredentials: true});
  }
  deleteLocationType(id:string){
    return this.http.delete(environment.rooturl + AppConstants.LOCATIONPROPS_API_URL +"/"+id,{ observe: 'response',withCredentials: true });
  }
  getUnassignedTags(){
    return this.http.get(environment.rooturl + AppConstants.TAGS_UNASSIGNED_API_URL,{ observe: 'response',withCredentials: true });
  }
  saveGroupMembers(group : Group, members: string[]){
    let groupMembers : GroupMembers = {group: group, members: members};
    return this.http.post(environment.rooturl + AppConstants.GROUP_MEMBERS_API_URL, groupMembers,{ observe: 'response', withCredentials: true});
  }
  saveGroup(group : Group){
    return this.http.post(environment.rooturl + AppConstants.GROUPS_API_URL, group,{ observe: 'response', withCredentials: true});
  }
  sendTestEmail(smtpSetting: SmtpSetting)
  {
    return this.http.post(environment.rooturl + AppConstants.SMTPTEST_API_URL,smtpSetting, { observe: 'response'});
  }
  saveSchedule(schedule: Schedule)
  {
    return this.http.post(environment.rooturl + AppConstants.SCHEDULES_API_URL,schedule, { observe: 'response',withCredentials: true});
  }
  getWeeklySchedules()
  {
    return this.http.get(environment.rooturl + AppConstants.SCHEDULES_BYTYPE_API_URL + "/1", { observe: 'response',withCredentials: true });
  }
  getCalendarSchedules()
  {
    return this.http.get(environment.rooturl + AppConstants.SCHEDULES_BYTYPE_API_URL + "/2",{ observe: 'response',withCredentials: true });
  }
  getSchedule(id:string)
  {
    return this.http.get(environment.rooturl + AppConstants.SCHEDULES_API_URL + "/" + id,{ observe: 'response',withCredentials: true });
  }
  deleteSchedule(id: string)
  {
    return this.http.delete(environment.rooturl + AppConstants.SCHEDULES_API_URL + "/" + id,{ observe: 'response',withCredentials: true });
  }
  getLicenses()
  {
    return this.http.get(environment.rooturl + AppConstants.LICENSE_API_URL,{ observe: 'response',withCredentials: true });
  }
  getUsers(){
    return this.http.get(environment.rooturl + AppConstants.USERS_API_URL,{ observe: 'response',withCredentials: true });
  }
  getSystemTitle(){
    return this.http.get(environment.rooturl + AppConstants.SYSTEM_TITLE_URL,{ observe: 'response'});
  }
  getSystemSubTitle(){
    return this.http.get(environment.rooturl + AppConstants.SYSTEM_SUBTITLE_URL,{ observe: 'response'});
  }
  getSchedulePermissions(){
    return this.http.get(environment.rooturl + AppConstants.SCHEDULES_API_PERMISSIONS_URL,{ observe: 'response'});
  }
  addAccessHistory(accessHistory: AccessHistory)
  {
    return this.http.post(environment.rooturl + AppConstants.ACCESSHISTORY_API_URL,accessHistory,{ observe: 'response', withCredentials: true});
  }
  changePassword(resetPassword: User) {
    return this.http.post(environment.rooturl + AppConstants.USERS_RESET_PASSWORD_API_URL,resetPassword,{ observe: 'response', withCredentials: true});
  }
  findAccountByEmail(email: string)
  {
    return this.http.get(environment.rooturl + AppConstants.ACCOUNT_API_URL +'/' + email,{ observe: 'response'});
  }
  sendResetPassword(email: string)
  {
    return this.http.post(environment.rooturl + AppConstants.ACCOUNT_SEND_RESETPASSWORD_API_URL +'/' + email,{ observe: 'response'});
  }
}
