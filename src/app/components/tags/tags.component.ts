import { Component, OnInit,Output, EventEmitter } from '@angular/core';
import { Tag } from 'src/app/model/tag';
import { DashboardService } from '../../services/dashboard/dashboard.service';
import { MatDialog } from '@angular/material/dialog';
import { TagDialogComponent } from 'src/app/dialogs/tag-dialog/tag-dialog.component';
import { ConfirmationDialogComponent } from 'src/app/dialogs/confirmation-dialog/confirmation-dialog.component';
import { MatTableDataSource } from '@angular/material/table';
import { PageEvent } from "@angular/material/paginator";

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css']
})
export class TagsComponent implements OnInit {

  columns: string[] = [
    'tagId',
    'status',
    'activationDate',
    'expirationDate',
    'registrationDate',
    'action'
  ];

  @Output() backClick = new EventEmitter();
  totalElements: number = 0;
  pageSize: number = 10;
  pageIndex: number = 0;
  tagList: Tag[] = [];
  status : string = '';
  dataSource?:  MatTableDataSource<any>;
  constructor(private dashboardService: DashboardService,protected dialog: MatDialog) { }

  ngOnInit(): void {

    this.getTags();
  }
  createTag()
  {
    let tag: Tag = new Tag();
    tag.registrationDate = new Date();

    let dialogRef = this.dialog.open(TagDialogComponent , {
      width: '600px',
      data: tag
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result == true)
        this.getTags();
    })
  }
  updateTag(tag:Tag)
  {
    let dialogRef = this.dialog.open(TagDialogComponent , {
      width: '600px',
      data: tag
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result == true)
        this.getTags();
    })
  }
  onDeleteTag(tag:Tag)
  {
    let dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: 'Are you sure you want to delete?'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result == true)
        this.deleteTag(tag);
    })
  }

  getTags()
	{
    this.dashboardService.getTagPage(this.pageIndex, this.pageSize).subscribe(
      responseData => {
      let temp =  <any> responseData.body;
      this.tagList = temp.content;
      this.totalElements  = temp.totalElements;
      this.dataSource = new MatTableDataSource(this.tagList);
      },
      error => {
        this.status = error.message;
      },);


	}
  deleteTag(tag: Tag)
  {
    this.dashboardService.deleteTag(tag.id).subscribe(
      result => {
      this.getTags();
      });
  }
  backHome()
  {
    this.backClick.emit();
  }
  onPage(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize =  event.pageSize;
    this.getTags();
  }

}
