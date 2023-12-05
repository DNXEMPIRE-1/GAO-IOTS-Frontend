import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RfiddevicesComponent } from './rfiddevices.component';

describe('RfiddevicesComponent', () => {
  let component: RfiddevicesComponent;
  let fixture: ComponentFixture<RfiddevicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RfiddevicesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RfiddevicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
