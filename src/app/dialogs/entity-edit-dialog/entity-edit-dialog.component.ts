import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, Inject, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { FormControl,ReactiveFormsModule } from '@angular/forms';
import { getMatFormFieldMissingControlError, MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EntityAttribute } from 'src/app/model/entityAttribute.model';
import { RfidEntity } from 'src/app/model/rfidEntity.model';
import { RfidObject } from 'src/app/model/rfidObject.model';
import { MatSelectModule } from '@angular/material/select';
import { DashboardService } from '../../services/dashboard/dashboard.service';
import { Tag } from 'src/app/model/tag';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-entity-edit-dialog',
  templateUrl: './entity-edit-dialog.component.html',
  styleUrls: ['./entity-edit-dialog.component.css']
})
export class EntityEditDialogComponent implements OnInit {

  myControl = new FormControl('');
  options: Tag[];
  filteredOptions: Observable<Tag[]>;
  entity! : RfidEntity
  constructor(
		public dialogRef: MatDialogRef<EntityEditDialogComponent>,
		@Inject(MAT_DIALOG_DATA) public data: {rfidObject: RfidObject, entity: RfidEntity},
    private dashboardService: DashboardService
	) {
      this.entity = data.entity;
      for (let attribut of this.entity.attributes)
      {
        if (attribut.type === 'Selections')
        {
          let rfidObjAttribute = data.rfidObject.attributes.find(element => {
            return element.name === attribut.name})
          attribut.selections = rfidObjAttribute?.selections;
        }
      }
  }

  ngOnInit(): void {
    this.dashboardService.getUnassignedTags().subscribe(responseData => {
      if (responseData.body)
        {
           this.options = <any>responseData.body;
           this.filteredOptions = this.myControl.valueChanges.pipe(
            startWith(''),
            map(value => this._filter(value || '')),
          );
        }
    })
  }
  onNoClick(): void {
		this.dialogRef.close();
	}

	onSave() {
    this.dashboardService.createRfidEntity(this.entity)
			.subscribe(responseData => {
				if (responseData.body)
        {
          this.dialogRef.close();
        }
			});

	}
  getItems()
  {

  }
  private _filter(value: string): Tag[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.tagId.toLowerCase().includes(filterValue));
  }
  getSelected(option: Tag)
  {
    this.entity.tagid = option.tagId;
  }
}
