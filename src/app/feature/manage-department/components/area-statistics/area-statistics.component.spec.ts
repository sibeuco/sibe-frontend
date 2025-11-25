import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AreaStatisticsComponent } from './area-statistics.component';

describe('AreaStatisticsComponent', () => {
  let component: AreaStatisticsComponent;
  let fixture: ComponentFixture<AreaStatisticsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AreaStatisticsComponent]
    });
    fixture = TestBed.createComponent(AreaStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
