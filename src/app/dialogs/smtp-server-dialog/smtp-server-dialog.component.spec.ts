import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmtpServerDialogComponent } from './smtp-server-dialog.component';

describe('SmtpServerDialogComponent', () => {
  let component: SmtpServerDialogComponent;
  let fixture: ComponentFixture<SmtpServerDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SmtpServerDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SmtpServerDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
