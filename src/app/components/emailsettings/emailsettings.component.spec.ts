import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailsettingsComponent } from './emailsettings.component';

describe('EmailsettingsComponent', () => {
  let component: EmailsettingsComponent;
  let fixture: ComponentFixture<EmailsettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmailsettingsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmailsettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
