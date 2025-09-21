import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HogarAreaActivityAttendanceComponent } from './hogar-area-activity-attendance.component';

describe('HogarAreaActivityAttendanceComponent', () => {
  let component: HogarAreaActivityAttendanceComponent;
  let fixture: ComponentFixture<HogarAreaActivityAttendanceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HogarAreaActivityAttendanceComponent]
    });
    fixture = TestBed.createComponent(HogarAreaActivityAttendanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
