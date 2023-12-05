import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemuserDialogComponent } from './systemuser-dialog.component';

describe('SystemuserDialogComponent', () => {
  let component: SystemuserDialogComponent;
  let fixture: ComponentFixture<SystemuserDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SystemuserDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SystemuserDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
