import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RereportComponent } from './rereport.component';

describe('RereportComponent', () => {
  let component: RereportComponent;
  let fixture: ComponentFixture<RereportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RereportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RereportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
