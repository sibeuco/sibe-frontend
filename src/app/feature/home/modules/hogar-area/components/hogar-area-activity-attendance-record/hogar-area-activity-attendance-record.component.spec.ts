import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HogarAreaActivityAttendanceRecordComponent } from './hogar-area-activity-attendance-record.component';

describe('HogarAreaActivityAttendanceRecordComponent', () => {
  let component: HogarAreaActivityAttendanceRecordComponent;
  let fixture: ComponentFixture<HogarAreaActivityAttendanceRecordComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HogarAreaActivityAttendanceRecordComponent]
    });
    fixture = TestBed.createComponent(HogarAreaActivityAttendanceRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
