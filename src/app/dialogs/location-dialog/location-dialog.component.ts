import { Component, Inject, OnInit, ViewChild, ElementRef} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DashboardService } from '../../services/dashboard/dashboard.service';
import { RfidLocation } from 'src/app/model/rfidLocation';
import { AppConstants } from 'src/app/constants/app.constants';
import { LocationType } from 'src/app/model/locationType';
import { ObjAttribute } from 'src/app/model/attribute.model';

@Component({
  selector: 'app-location-dialog',
  templateUrl: './location-dialog.component.html',
  styleUrls: ['./location-dialog.component.css']
})
export class LocationDialogComponent implements OnInit {

  public location : RfidLocation;
  public parentLocation: RfidLocation = null as any;
  public locationTypes: LocationType[];
  fileAttr = 'Choose File';
  status: string = '';
  @ViewChild('fileInput') fileInput: ElementRef;
  constructor(
		public dialogRef: MatDialogRef<LocationDialogComponent>,
		@Inject(MAT_DIALOG_DATA) public data: {location: RfidLocation, parentLocation: RfidLocation},
    private dashboardService: DashboardService
	) {
      this.location = data.location;
      if (data.parentLocation != null)
        this.parentLocation = data.parentLocation;
  }

  ngOnInit(): void {
    this.dashboardService.getLocationTypes().subscribe(result=>
      {
        if (result.body)
        {
          this.locationTypes = <any> result.body;
        }
      })
  }
  onNoClick(): void {
		this.dialogRef.close(false);
	}

  removeImage()
  {
    this.location.image = null as any;
  }
	updateLocation() {
    this.status = '';
    if (this.parentLocation)
      this.location.parentId = this.parentLocation.id;

    this.dashboardService.updateLocation(this.location)
			.subscribe(responseData => {
				if (responseData.body)
        {
          this.location = <any> responseData.body;
           this.dialogRef.close({status:true,data:this.location});
        }
			},
      error => {
        this.status = error.message;
      });


	}
  assignParent()
  {}
  assignDevice() {}
  uploadImage(imgFile: any)
  {
    if (imgFile.target.files && imgFile.target.files[0]) {
      this.fileAttr = '';
      Array.from(imgFile.target.files).forEach((file: any) => {
        this.fileAttr += file.name + ' - ';
      });
      // HTML5 FileReader API
      let reader = new FileReader();
      reader.onload = (e: any) => {
        let image = new Image();
        image.src = e.target.result;
        image.onload = (rs) => {
          this.location.image = e.target.result;
        };
      };
      reader.readAsDataURL(imgFile.target.files[0]);
      // Reset if duplicate image uploaded again
      this.fileInput.nativeElement.value = '';
    } else {
      this.fileAttr = 'Choose File';
    }
  }
  onTypeChange(locationTypeName: string)
  {
     let locType = this.locationTypes.find(element => {
      return element.name === locationTypeName})
      this.location.attributes = locType?.attributes;
  }
}

