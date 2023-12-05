import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessSchedulesComponent } from './access-schedules.component';

describe('AccessSchedulesComponent', () => {
  let component: AccessSchedulesComponent;
  let fixture: ComponentFixture<AccessSchedulesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccessSchedulesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccessSchedulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
