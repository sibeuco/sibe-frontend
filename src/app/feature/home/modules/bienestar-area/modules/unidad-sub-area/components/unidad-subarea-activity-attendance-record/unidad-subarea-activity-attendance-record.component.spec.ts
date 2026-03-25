import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnidadSubareaActivityAttendanceRecordComponent } from './unidad-subarea-activity-attendance-record.component';

describe('UnidadSubareaActivityAttendanceRecordComponent', () => {
  let component: UnidadSubareaActivityAttendanceRecordComponent;
  let fixture: ComponentFixture<UnidadSubareaActivityAttendanceRecordComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UnidadSubareaActivityAttendanceRecordComponent]
    });
    fixture = TestBed.createComponent(UnidadSubareaActivityAttendanceRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
