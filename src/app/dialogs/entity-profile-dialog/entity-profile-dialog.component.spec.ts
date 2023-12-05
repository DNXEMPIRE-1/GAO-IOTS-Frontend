import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntityProfileDialogComponent } from './entity-profile-dialog.component';

describe('EntityProfileDialogComponent', () => {
  let component: EntityProfileDialogComponent;
  let fixture: ComponentFixture<EntityProfileDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EntityProfileDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EntityProfileDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
