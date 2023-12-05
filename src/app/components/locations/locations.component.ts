import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { RfidLocation } from 'src/app/model/rfidLocation';
import { LocationNode } from 'src/app/model/location_node';
import { DashboardService } from '../../services/dashboard/dashboard.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { LocationDialogComponent } from 'src/app/dialogs/location-dialog/location-dialog.component';
import { ConfirmationDialogComponent } from 'src/app/dialogs/confirmation-dialog/confirmation-dialog.component';
import { MatTableDataSource } from '@angular/material/table';
import { LocationImageDialogComponent } from 'src/app/dialogs/location-image-dialog/location-image-dialog.component';
import { Router } from '@angular/router';
import { P } from '@angular/cdk/keycodes';
import {NestedTreeControl} from '@angular/cdk/tree';
import {MatTreeNestedDataSource} from '@angular/material/tree';
import { Group } from 'src/app/model/group';
import {BehaviorSubject} from 'rxjs';
@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.css']
})
export class LocationsComponent implements OnInit {

  @Output() backClick = new EventEmitter();
  treeControl = new NestedTreeControl<LocationNode>(node => node.children);
  dataSource = new MatTreeNestedDataSource<LocationNode>();
  selectedSchedules: string[] | null;
  columns: string[] = [
    'children',
    'name',
    'image',
    'locationType',
    'action'
  ];

  dataChange = new BehaviorSubject<LocationNode[]>([]);
  imgDialogRef : MatDialogRef<LocationImageDialogComponent>;
  status : string = '';
  public groups : Group[] = [];
  constructor(private router: Router, private dashboardService: DashboardService,protected dialog: MatDialog) { }

  hasChild = (_: number, node: LocationNode) => !!node.children && node.children.length > 0;

  ngOnInit(): void {
    this.dashboardService.getLocation('123').subscribe(
      responseData => {
        status= ''; // nothing wrong
      } ,
      error => {
        this.status = error.message;
      });
    this.getLocationTree(null as any);
    this.refreshGroups();
  }

  getLocationTree(node: LocationNode)
  {
    this.dashboardService.getLocationTree().subscribe(
      responseData => {
        this.dataSource.data =  <any> responseData.body;
        if (node != null)
          this.treeControl.expand(node);
      } ,
      error => {
        this.status = error.message;
      });
  }
  addChild(node: LocationNode)
  {
    let location: RfidLocation = new RfidLocation();

    let dialogRef = this.dialog.open(LocationDialogComponent , {
      width: '600px',
      data: {location: location, parentLocation: node.location}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result.status == true)
      {
        let data = this.dataSource.data;
        if (!node.children)
          node.children = [];
        let child : LocationNode = {location:location};
        node.children.push(child) ;
        this.dataSource.data = null as any;
        this.dataSource.data = data;
        this.treeControl.expand(node);
      }
    })
  }
  createLocation()
  {
    let location: RfidLocation = new RfidLocation();

    let parent: RfidLocation = null as any;

    let dialogRef = this.dialog.open(LocationDialogComponent , {
      width: '600px',
      data: {location: location, parentLocation: parent}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result.status == true)
      {
        this.getLocationTree(null as any);
      }
    })
  }

  updateLocation(node:LocationNode)
  {
    let dialogRef = this.dialog.open(LocationDialogComponent , {
      width: '600px',
      data: {location: node.location}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result == true)
        this.getLocationTree(node);
    })
  }

  onDeleteLocation(node:LocationNode)
  {
    let dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: 'Are you sure you want to delete?'
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result == true)
      {
        this.deleteLocation(node.location);
        this.getLocationTree(node);
      }
    })
  }

  deleteLocation(location: RfidLocation)
  {
    this.dashboardService.deleteLocation(location.id).subscribe(
      result => {
      this.getLocationTree(null as any);
      });
  }
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
                data: { location: node.location, parentImage: parent.image, setPosition: true}
              });
              const subscribeDialog = this.imgDialogRef.componentInstance.imagePosition.subscribe((data) => {
                node.location.x = data.x;
                node.location.y = data.y;
                this.saveLocation(node);
              });
          }
        )
      }
    }
    else
    {
      this.imgDialogRef = this.dialog.open(LocationImageDialogComponent , {
        data: { location: node.location}
      });
    }
  }
  showSchedules(node: LocationNode)
  {
    this.selectedSchedules = node.location.schedules!;
  }
  closeImage()
  {
    this.imgDialogRef.close();
  }
  backHome()
  {
    this.backClick.emit();
  }
  locationPage()
  {
    this.getLocationTree(null as any);
  }
  reload()
  {
    this.getLocationTree(null as any);
  }
  refreshGroups()
  {
    this.dashboardService.getGroups(1).subscribe(
      responseData => {
      this.groups =  <any> responseData.body;
      });
  }
  saveLocation(node:LocationNode)
  {
    this.dashboardService.updateLocation(node.location).subscribe(
      result => {

      });
  }
}
