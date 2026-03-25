import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicioAreaActivityAttendanceRecordComponent } from './servicio-area-activity-attendance-record.component';

describe('ServicioAreaActivityAttendanceRecordComponent', () => {
  let component: ServicioAreaActivityAttendanceRecordComponent;
  let fixture: ComponentFixture<ServicioAreaActivityAttendanceRecordComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ServicioAreaActivityAttendanceRecordComponent]
    });
    fixture = TestBed.createComponent(ServicioAreaActivityAttendanceRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
