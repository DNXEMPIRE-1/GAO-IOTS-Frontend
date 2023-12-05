import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceModelFormComponent } from './device-model-form.component';

describe('DeviceModelFormComponent', () => {
  let component: DeviceModelFormComponent;
  let fixture: ComponentFixture<DeviceModelFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeviceModelFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeviceModelFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
