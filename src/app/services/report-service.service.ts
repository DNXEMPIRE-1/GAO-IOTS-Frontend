import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConstants } from "../constants/app.constants";
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReportServiceService {

  constructor(private http:HttpClient) { }
}
