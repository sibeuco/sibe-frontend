import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicioAreaActivityAttendanceComponent } from './servicio-area-activity-attendance.component';

describe('ServicioAreaActivityAttendanceComponent', () => {
  let component: ServicioAreaActivityAttendanceComponent;
  let fixture: ComponentFixture<ServicioAreaActivityAttendanceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ServicioAreaActivityAttendanceComponent]
    });
    fixture = TestBed.createComponent(ServicioAreaActivityAttendanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
