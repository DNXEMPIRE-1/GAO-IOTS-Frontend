import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationpropDialogComponent } from './locationprop-dialog.component';

describe('LocationpropDialogComponent', () => {
  let component: LocationpropDialogComponent;
  let fixture: ComponentFixture<LocationpropDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocationpropDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LocationpropDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
