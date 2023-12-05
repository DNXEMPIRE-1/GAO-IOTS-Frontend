import { ReportDataField } from "./report-data-field";
export interface ReportData {
	reportName:string;
	startDate: Date;
  endDate:Date;
  data: ReportDataField[];
}
