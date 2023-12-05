import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RfidObjectsComponent } from './rfid-objects.component';

describe('RfidObjectsComponent', () => {
  let component: RfidObjectsComponent;
  let fixture: ComponentFixture<RfidObjectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RfidObjectsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RfidObjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
