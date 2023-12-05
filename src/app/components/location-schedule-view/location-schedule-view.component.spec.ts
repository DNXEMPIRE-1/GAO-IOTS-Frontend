import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationScheduleViewComponent } from './location-schedule-view.component';

describe('LocationScheduleViewComponent', () => {
  let component: LocationScheduleViewComponent;
  let fixture: ComponentFixture<LocationScheduleViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocationScheduleViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LocationScheduleViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
