import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, Inject, EventEmitter, Input, Output, OnInit,ViewChild,ElementRef } from '@angular/core';
import { FormControl,ReactiveFormsModule } from '@angular/forms';
import { getMatFormFieldMissingControlError, MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogRef, MAT_DIALOG_DATA,MatDialog } from '@angular/material/dialog';
import { EntityAttribute } from 'src/app/model/entityAttribute.model';
import { RfidEntity } from 'src/app/model/rfidEntity.model';
import { RfidObject } from 'src/app/model/rfidObject.model';
import { MatSelectModule } from '@angular/material/select';
import { DashboardService } from '../../services/dashboard/dashboard.service';
import { Tag } from 'src/app/model/tag';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-entity-dialog',
  templateUrl: './entity-dialog.component.html',
  styleUrls: ['./entity-dialog.component.css']
})
export class EntityDialogComponent implements OnInit {


  @ViewChild('fileInput') fileInput: ElementRef;
  myControl = new FormControl('');
  options: Tag[];
  filteredOptions: Observable<Tag[]>;

  @Output()
	saver = new EventEmitter();

  entity : RfidEntity
  constructor(
		public dialogRef: MatDialogRef<EntityDialogComponent>,
		@Inject(MAT_DIALOG_DATA) public data: { rfidObject: RfidObject, entity: RfidEntity},
    private dashboardService: DashboardService,
    protected dialog: MatDialog,
	) {
      let attrList: EntityAttribute[];
      if (data.entity == null)
      {
        this.entity = new RfidEntity();
        this.entity.classId = data.rfidObject.id;
        this.entity.attributes = data.rfidObject.attributes;
      }
      else
      {
        this.entity = data.entity;
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
		this.dialogRef.close(false);
	}

	onSave() {
    this.dashboardService.createRfidEntity(this.entity)
			.subscribe(responseData => {
				if (responseData.body)
        {
          this.saver.emit();
          this.dialogRef.close(true);
        }
			});

	}
  private _filter(value: string): Tag[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.tagId.toLowerCase().includes(filterValue));
  }
  getSelected(option: Tag)
  {
    this.entity.tagid = option.tagId;
  }
  uploadImage(imgFile: any)
  {
    if (imgFile.target.files && imgFile.target.files[0]) {

      // HTML5 FileReader API
      let reader = new FileReader();
      reader.onload = (e: any) => {
        let image = new Image();
        image.src = e.target.result;
        image.onload = (rs) => {
          this.entity.image = e.target.result;
        };
      };
      reader.readAsDataURL(imgFile.target.files[0]);
      // Reset if duplicate image uploaded again
      this.fileInput.nativeElement.value = '';
    }
  }
  removeImage()
  {
    this.entity.image = null as any;
  }
}
