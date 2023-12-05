import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportFromComponent } from './report-from.component';

describe('ReportFromComponent', () => {
  let component: ReportFromComponent;
  let fixture: ComponentFixture<ReportFromComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportFromComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportFromComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
