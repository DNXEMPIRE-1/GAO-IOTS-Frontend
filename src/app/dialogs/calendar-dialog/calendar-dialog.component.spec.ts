import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarDialogComponent } from './calendar-dialog.component';

describe('CalendarDialogComponent', () => {
  let component: CalendarDialogComponent;
  let fixture: ComponentFixture<CalendarDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalendarDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalendarDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
