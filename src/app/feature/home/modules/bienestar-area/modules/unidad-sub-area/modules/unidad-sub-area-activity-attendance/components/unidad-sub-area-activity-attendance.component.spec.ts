import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnidadSubAreaActivityAttendanceComponent } from './unidad-sub-area-activity-attendance.component';

describe('UnidadSubAreaActivityAttendanceComponent', () => {
  let component: UnidadSubAreaActivityAttendanceComponent;
  let fixture: ComponentFixture<UnidadSubAreaActivityAttendanceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UnidadSubAreaActivityAttendanceComponent]
    });
    fixture = TestBed.createComponent(UnidadSubAreaActivityAttendanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
