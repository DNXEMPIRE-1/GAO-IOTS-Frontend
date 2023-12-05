import { Component, OnInit,Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LocationType } from 'src/app/model/locationType';
import { DashboardService } from 'src/app/services/dashboard/dashboard.service';
import { FormControl,ReactiveFormsModule } from '@angular/forms';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { EntityAttribute} from 'src/app/model/entityAttribute.model'
import { OptionValueDialogComponent } from 'src/app/dialogs/option-value-dialog/option-value-dialog.component';

@Component({
  selector: 'app-locationprop-dialog',
  templateUrl: './locationprop-dialog.component.html',
  styleUrls: ['./locationprop-dialog.component.css']
})
export class LocationpropDialogComponent implements OnInit {

  separatorKeysCodes: number[] = [ENTER, COMMA];
  optionCtrl : FormControl = new FormControl();
  public locationType: LocationType;
  types: string[] = ['Boolean','Date','Geocode','Number','Selections', 'String' ];
  constructor(
    private dashboardService: DashboardService,
		public dialogRef: MatDialogRef<LocationpropDialogComponent>,
    public dialog: MatDialog,
		@Inject(MAT_DIALOG_DATA) public data: LocationType)
    {
      this.locationType = data;
    }

  ngOnInit(): void {
  }
  onNoClick(): void {
		this.dialogRef.close(false);
	}

	updateLocationType() {
    this.dashboardService.updateLocationType(this.locationType)
			.subscribe(responseData => {
				if (responseData.body)
        {
           this.dialogRef.close(true);
        }
			});

	}
  removeAttribute(item: EntityAttribute) {
    if (this.locationType.attributes)
    {
		  let index = this.locationType.attributes.indexOf(item);
		  this.locationType.attributes.splice(index, 1);
    }
	}
	addAttribute(item: EntityAttribute) {

    if (this.locationType.attributes == null)
      this.locationType.attributes = new Array();
		this.locationType.attributes.push(item);

	}
  addField() {
		let item: EntityAttribute = {
			id: '',
			name: '',
      value: null as any,
			type: "String",
			required: false,
			selections: [],
		};
		this.locationType.attributes.push(item);
		return item;
	}
  removeField(item: EntityAttribute) {
		let items = this.locationType.attributes;
		let index = items.indexOf(item);
		items.splice(index, 1);
	}
  defineOptions(items: string[]) {
		this.dialog.open(OptionValueDialogComponent, {
			width: '600px',
			data: items
		});
	}
}
