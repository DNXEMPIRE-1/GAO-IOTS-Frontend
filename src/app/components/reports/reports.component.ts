import { Component, OnInit,Output, EventEmitter } from '@angular/core';
import { PageEvent } from "@angular/material/paginator";
import { FormControl, FormGroup } from "@angular/forms";
import { DashboardService } from '../../services/dashboard/dashboard.service';
import { ReportService } from 'src/app/services/report.service';
import { ReportItem } from 'src/app/model/report-item';
import { Router } from '@angular/router';
import { ReportRequest } from 'src/app/model/reportrequest';
import { ReportData } from 'src/app/model/report-data';
import { ReportDataField } from 'src/app/model/report-data-field';
import { ReportDataRow } from 'src/app/model/report-data-row';
import { ReportPage } from 'src/app/model/reportpage';
import { MatInputModule } from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSort, Sort} from '@angular/material/sort';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import { DomSanitizer } from '@angular/platform-browser';

declare global {
  interface Blob {
    saveFile(fileName: string): void;
  }
}
Blob.prototype.saveFile = function (fileName: string) {

    const a = document.createElement('a');
    document.body.appendChild(a);
    const url = window.URL.createObjectURL(this);
    a.href = url;
    a.download = fileName;
    a.click();
    setTimeout(() => {
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    }, 0);

};



@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
  @Output() backClick = new EventEmitter();
  selected: ReportItem;
  reportData: ReportDataRow[];
  reportPage: ReportPage;
	reports: ReportItem[] = [];

  startDate: Date = new Date();
  endDate:   Date = new Date();
  sortBy: string = '';
  sortByOrder: number = 0;
  pageIndex: number = 0;
	pageSize: number = 10;
  totalElements = 0;
  searchText: string = '';
  searchField: string = '';
  status : string = '';
  fileUrl: any;
	constructor(private dashboardService : DashboardService,
    private reportService: ReportService, private router: Router,
    private _liveAnnouncer: LiveAnnouncer,
    private sanitizer:DomSanitizer )
  {

	}

	backHome(): void {
		this.backClick.emit();
	}

	ngOnInit(): void {
    this.reportService.getReportItems().subscribe(
      responseData => {
      this.reports = <any> responseData.body;
      },
      error => {
        this.status = error.message;
      });
	}

	showReport() {
    if (this.selected != null)
    {
      this.sortBy = this.selected.columns[0]; // default to the first column
      this.searchField = this.selected.columns[0];
      this.sortBy = this.selected.columns[0];
      this.sortByOrder = 0;
      this.pageIndex   = 0;
	    this.pageSize   = 10;
      this.totalElements = 0;
      this.searchText    = '';
      this.search();
    }
	}
  search() {
    if (this.selected != null)
    {
      let request : ReportRequest = {className: this.selected.className, startDate: this.startDate, endDate: this.endDate,
                                      searchText: this.searchText, searchField: this.searchField,
                                      sortBy: this.sortBy, sortByOrder: this.sortByOrder, pageIndex: this.pageIndex, pageSize: this.pageSize};
      this.reportService.getReportData(request).subscribe(
        responseData => {
        this.reportPage = <any> responseData.body;
        this.reportData = this.reportPage.content;
        this.totalElements  = this.reportPage.totalElements;
        });
    }
  }

  pdf() {
    this.reportService.getReportPdf(this.selected.className, this.startDate, this.endDate).subscribe(
      responseData => {

        let document = <any> responseData.body;
        const blob = new Blob([document], { type: 'application/pdf' } );
        let fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
          window.URL.createObjectURL(blob)

        );
        blob.saveFile(this.selected.name+".pdf");
      });
  }

  csv() {
    this.reportService.getReportCsv(this.selected.className, this.startDate, this.endDate).subscribe(
      responseData => {

        let document = <any> responseData.body;
        const blob = new Blob([document], { type: 'application/csv' } );
        let fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
          window.URL.createObjectURL(blob)

        );
        blob.saveFile(this.selected.name+".csv");
      });

  }

	handleError(error: Error): void {

	}
  downloadPDF(start: string, end: string): void {

	}
	downloadCSV(start: string, end: string): void {

	}
  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
      this.sortBy = sortState.active;
      if (sortState.direction === 'asc')
        this.sortByOrder = 0;
      else
        this.sortByOrder = 1;
      this.search();
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
  onPage(event: PageEvent) {
			this.pageIndex = event.pageIndex;
			this.pageSize =  event.pageSize;
			this.search();
	}

}
