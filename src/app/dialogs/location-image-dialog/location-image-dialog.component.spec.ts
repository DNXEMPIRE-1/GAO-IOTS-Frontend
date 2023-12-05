import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationImageDialogComponent } from './location-image-dialog.component';

describe('LocationImageDialogComponent', () => {
  let component: LocationImageDialogComponent;
  let fixture: ComponentFixture<LocationImageDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocationImageDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LocationImageDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
