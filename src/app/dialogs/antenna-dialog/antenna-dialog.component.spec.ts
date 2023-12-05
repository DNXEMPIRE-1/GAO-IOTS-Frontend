import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AntennaDialogComponent } from './antenna-dialog.component';

describe('AntennaDialogComponent', () => {
  let component: AntennaDialogComponent;
  let fixture: ComponentFixture<AntennaDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AntennaDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AntennaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
