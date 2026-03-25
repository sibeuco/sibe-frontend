import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GimnasioSubareaActivityAttendanceRecordComponent } from './gimnasio-subarea-activity-attendance-record.component';

describe('GimnasioSubareaActivityAttendanceRecordComponent', () => {
  let component: GimnasioSubareaActivityAttendanceRecordComponent;
  let fixture: ComponentFixture<GimnasioSubareaActivityAttendanceRecordComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GimnasioSubareaActivityAttendanceRecordComponent]
    });
    fixture = TestBed.createComponent(GimnasioSubareaActivityAttendanceRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
