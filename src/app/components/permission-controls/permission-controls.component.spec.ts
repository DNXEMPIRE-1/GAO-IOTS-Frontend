import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PermissionControlsComponent } from './permission-controls.component';

describe('PermissionControlsComponent', () => {
  let component: PermissionControlsComponent;
  let fixture: ComponentFixture<PermissionControlsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PermissionControlsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PermissionControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
