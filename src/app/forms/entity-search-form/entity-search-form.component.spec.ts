import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntitySearchFormComponent } from './entity-search-form.component';

describe('EntitySearchFormComponent', () => {
  let component: EntitySearchFormComponent;
  let fixture: ComponentFixture<EntitySearchFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EntitySearchFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EntitySearchFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
