import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrabajoSocialSubAreaActivityAttendanceComponent } from './trabajo-social-sub-area-activity-attendance.component';

describe('TrabajoSocialSubAreaActivityAttendanceComponent', () => {
  let component: TrabajoSocialSubAreaActivityAttendanceComponent;
  let fixture: ComponentFixture<TrabajoSocialSubAreaActivityAttendanceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TrabajoSocialSubAreaActivityAttendanceComponent]
    });
    fixture = TestBed.createComponent(TrabajoSocialSubAreaActivityAttendanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
