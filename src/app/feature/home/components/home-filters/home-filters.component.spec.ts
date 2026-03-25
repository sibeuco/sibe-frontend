import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeFiltersComponent } from './home-filters.component';

describe('HomeFiltersComponent', () => {
  let component: HomeFiltersComponent;
  let fixture: ComponentFixture<HomeFiltersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeFiltersComponent]
    });
    fixture = TestBed.createComponent(HomeFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
