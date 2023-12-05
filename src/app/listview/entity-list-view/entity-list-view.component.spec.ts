import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntityListViewComponent } from './entity-list-view.component';

describe('EntityListViewComponent', () => {
  let component: EntityListViewComponent;
  let fixture: ComponentFixture<EntityListViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EntityListViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EntityListViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
