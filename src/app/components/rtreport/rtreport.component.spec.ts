import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RtreportComponent } from './rtreport.component';

describe('RtreportComponent', () => {
  let component: RtreportComponent;
  let fixture: ComponentFixture<RtreportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RtreportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RtreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
