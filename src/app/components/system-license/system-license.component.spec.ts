import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemLicenseComponent } from './system-license.component';

describe('SystemLicenseComponent', () => {
  let component: SystemLicenseComponent;
  let fixture: ComponentFixture<SystemLicenseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SystemLicenseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SystemLicenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
