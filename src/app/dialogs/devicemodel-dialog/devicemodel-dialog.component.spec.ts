import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevicemodelDialogComponent } from './devicemodel-dialog.component';

describe('DevicemodelDialogComponent', () => {
  let component: DevicemodelDialogComponent;
  let fixture: ComponentFixture<DevicemodelDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DevicemodelDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DevicemodelDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
