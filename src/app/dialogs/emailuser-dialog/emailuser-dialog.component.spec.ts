import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailuserDialogComponent } from './emailuser-dialog.component';

describe('EmailuserDialogComponent', () => {
  let component: EmailuserDialogComponent;
  let fixture: ComponentFixture<EmailuserDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmailuserDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmailuserDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
