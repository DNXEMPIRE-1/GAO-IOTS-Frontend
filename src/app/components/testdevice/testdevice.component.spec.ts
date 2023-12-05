import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestdeviceComponent } from './testdevice.component';

describe('TestdeviceComponent', () => {
  let component: TestdeviceComponent;
  let fixture: ComponentFixture<TestdeviceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestdeviceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestdeviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
