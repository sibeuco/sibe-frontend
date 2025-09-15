import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BienestarAreaActivityAttendanceComponent } from './bienestar-area-activity-attendance.component';

describe('BienestarAreaActivityAttendanceComponent', () => {
  let component: BienestarAreaActivityAttendanceComponent;
  let fixture: ComponentFixture<BienestarAreaActivityAttendanceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BienestarAreaActivityAttendanceComponent]
    });
    fixture = TestBed.createComponent(BienestarAreaActivityAttendanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
