import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntityEditDialogComponent } from './entity-edit-dialog.component';

describe('EntityEditDialogComponent', () => {
  let component: EntityEditDialogComponent;
  let fixture: ComponentFixture<EntityEditDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EntityEditDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EntityEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
