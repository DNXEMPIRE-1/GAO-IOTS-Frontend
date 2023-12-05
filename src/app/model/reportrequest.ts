export interface ReportRequest {
  className: string;
  startDate: Date;
  endDate: Date;
  sortBy: string;
  sortByOrder: number;
  pageIndex: number;
  pageSize: number;
  searchText: string;
  searchField: string;
}
