import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceModelsComponent } from './device-models.component';

describe('DeviceModelsComponent', () => {
  let component: DeviceModelsComponent;
  let fixture: ComponentFixture<DeviceModelsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeviceModelsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeviceModelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
