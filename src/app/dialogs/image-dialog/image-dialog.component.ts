import { Component, OnInit,Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-image-dialog',
  templateUrl: './image-dialog.component.html',
  styleUrls: ['./image-dialog.component.css']
})
export class ImageDialogComponent implements OnInit {

  constructor(
		public dialogRef: MatDialogRef<ImageDialogComponent>,
		@Inject(MAT_DIALOG_DATA) public data: {name: string, base64: string})
    {}

  ngOnInit(): void {
  }
  closeDialog()
  {
    this.dialogRef.close();
  }

}
