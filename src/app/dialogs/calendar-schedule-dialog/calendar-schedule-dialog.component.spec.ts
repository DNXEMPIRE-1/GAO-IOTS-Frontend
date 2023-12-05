import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarScheduleDialogComponent } from './calendar-schedule-dialog.component';

describe('CalendarScheduleDialogComponent', () => {
  let component: CalendarScheduleDialogComponent;
  let fixture: ComponentFixture<CalendarScheduleDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalendarScheduleDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalendarScheduleDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
