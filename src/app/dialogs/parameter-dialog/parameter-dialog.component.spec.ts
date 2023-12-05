import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParameterDialogComponent } from './parameter-dialog.component';

describe('ParameterDialogComponent', () => {
  let component: ParameterDialogComponent;
  let fixture: ComponentFixture<ParameterDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParameterDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParameterDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
