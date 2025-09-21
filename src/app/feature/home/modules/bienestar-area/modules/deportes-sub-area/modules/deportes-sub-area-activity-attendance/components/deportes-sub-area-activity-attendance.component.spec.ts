import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeportesSubAreaActivityAttendanceComponent } from './deportes-sub-area-activity-attendance.component';

describe('DeportesSubAreaActivityAttendanceComponent', () => {
  let component: DeportesSubAreaActivityAttendanceComponent;
  let fixture: ComponentFixture<DeportesSubAreaActivityAttendanceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeportesSubAreaActivityAttendanceComponent]
    });
    fixture = TestBed.createComponent(DeportesSubAreaActivityAttendanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
