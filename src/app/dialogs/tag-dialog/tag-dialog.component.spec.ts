import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TagDialogComponent } from './tag-dialog.component';

describe('TagDialogComponent', () => {
  let component: TagDialogComponent;
  let fixture: ComponentFixture<TagDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TagDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TagDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
