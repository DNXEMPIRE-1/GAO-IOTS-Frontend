import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemSettingsDetailsComponent } from './system-settings-details.component';

describe('SystemSettingsDetailsComponent', () => {
  let component: SystemSettingsDetailsComponent;
  let fixture: ComponentFixture<SystemSettingsDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SystemSettingsDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SystemSettingsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
