import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletedActivitiesComponent } from './completed-activities.component';

describe('CompletedActivitiesComponent', () => {
  let component: CompletedActivitiesComponent;
  let fixture: ComponentFixture<CompletedActivitiesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CompletedActivitiesComponent]
    });
    fixture = TestBed.createComponent(CompletedActivitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
