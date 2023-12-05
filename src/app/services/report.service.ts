import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConstants } from "../constants/app.constants";
import { environment } from '../../environments/environment';
import { ReportRequest } from '../model/reportrequest';
import { DateSelectionModelChange } from '@angular/material/datepicker';
import { HttpInterceptor,HttpRequest,HttpHandler,HttpErrorResponse, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(private http:HttpClient) { }

  getReportItems(){
    return this.http.get(environment.rooturl + AppConstants.REPORTS_API_URL,{ observe: 'response',withCredentials: true });
  }
  getReportItem(className: string){
    return this.http.get(environment.rooturl + AppConstants.REPORTS_API_URL + '/' + className,{ observe: 'response',withCredentials: true });
  }
  getReportData(request: ReportRequest)
  {
    let url = environment.rooturl + AppConstants.REPORTS_API_URL + '/'+ request.className+'/'+
              request.startDate.getTime() +'/'+ request.endDate.getTime() + '/'+
              request.pageIndex + '/' + request.pageSize + '/' + request.sortBy + '/' + request.sortByOrder
    if (request.searchField.length > 0 && request.searchText.length > 0) // request for searching
       url = url + '/'  + request.searchField + '/'+ request.searchText;
    return this.http.get(url,{ observe: 'response',withCredentials: true });
  }
  getReportPdf(className: string, startDate: Date, endDate: Date)
  {
    let url = environment.rooturl + AppConstants.REPORTS_PDF_API_URL + '/'+ className+'/'+
              startDate.getTime() +'/'+ endDate.getTime()
    return this.http.get(url,{ observe: 'response',withCredentials: true, responseType:'blob' },);
  }
  getReportCsv(className: string, startDate: Date, endDate: Date)
  {
    let url = environment.rooturl + AppConstants.REPORTS_CSV_API_URL + '/'+ className+'/'+
              startDate.getTime() +'/'+ endDate.getTime()
    return this.http.get(url,{ observe: 'response',withCredentials: true, responseType:'blob' },);
  }
  setAccessHistoryStatus(accessHitoryId:string, status: boolean)
  {
    return this.http.post(environment.rooturl + AppConstants.REPORTS_API_URL + '/' + accessHitoryId + '/'+ status,{ observe: 'response',withCredentials: true });
  }
  removeAccessHistory(accessHitoryId:string)
  {
    return this.http.delete(environment.rooturl + AppConstants.ACCESSHISTORY_API_URL + '/' + accessHitoryId ,{ observe: 'response',withCredentials: true });
  }
}
