import { Component, OnInit,EventEmitter, Output, Input } from '@angular/core';
import { RfidLocation } from 'src/app/model/rfidLocation';
import { LocationNode } from 'src/app/model/location_node';
import { DashboardService } from '../../services/dashboard/dashboard.service';
import {NestedTreeControl} from '@angular/cdk/tree';
import {MatTreeNestedDataSource} from '@angular/material/tree';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { LocationDialogComponent } from 'src/app/dialogs/location-dialog/location-dialog.component';
import { ConfirmationDialogComponent } from 'src/app/dialogs/confirmation-dialog/confirmation-dialog.component';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { LocationImageDialogComponent } from 'src/app/dialogs/location-image-dialog/location-image-dialog.component';
import { Tag } from 'src/app/model/tag';
import { RfidDevice } from 'src/app/model/rfidDevice';

@Component({
  selector: 'app-location-selection',
  templateUrl: './location-selection.component.html',
  styleUrls: ['./location-selection.component.css']
})
export class LocationSelectionComponent implements OnInit {

  @Output() locationSelected = new EventEmitter<any>();
  @Output() closeSelectEvent = new EventEmitter();

  @Input() tag: Tag;
  @Input() device: RfidDevice;

  @Input() showClose = true;
  imgDialogRef : MatDialogRef<LocationImageDialogComponent>;
  locationList: RfidLocation[] = [];
  treeControl = new NestedTreeControl<LocationNode>(node => node.children);
  dataSource = new MatTreeNestedDataSource<LocationNode>();
  selected: LocationNode;
  constructor(private router: Router, private dashboardService: DashboardService,protected dialog: MatDialog) { }

  ngOnInit(): void {
    this.getLocationTree();
  }

  hasChild = (_: number, node: LocationNode) => !!node.children && node.children.length > 0;


  showImage(node: LocationNode)
  {
    if (node.location.useParentImage && node.location.useParentImage ===true)
    {
      if (node.location.parentId)
      {
          this.dashboardService.getLocation(node.location.parentId).subscribe(
            responseData => {
              let parent: RfidLocation = <any> responseData.body;
              this.imgDialogRef = this.dialog.open(LocationImageDialogComponent , {
                data: { location: node.location, parentImage: parent.image, tag: this.tag}
              });
          }
        )
      }
    }
    else
    {
      this.imgDialogRef = this.dialog.open(LocationImageDialogComponent , {
        data: { location: node.location, tag: this.tag}
      });
    }

  }
  getLocationTree()
	{

    this.dashboardService.getLocationTree().subscribe(
      responseData => {
        this.dataSource.data =  <any> responseData.body;
      },)
	}

  onSelected(node:LocationNode)
  {
    this.selected = node;
    this.locationSelected.emit(this.selected.location);
  }
  backHome()
  {
    this.router.navigate(['tags']);
  }

  closeSelection()
  {
    this.closeSelectEvent.emit();
  }
}
