import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AreaFiltersComponent } from './area-filters.component';

describe('AreaFiltersComponent', () => {
  let component: AreaFiltersComponent;
  let fixture: ComponentFixture<AreaFiltersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AreaFiltersComponent]
    });
    fixture = TestBed.createComponent(AreaFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
