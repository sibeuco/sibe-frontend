import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtensionSubareaActivityAttendanceRecordComponent } from './extension-subarea-activity-attendance-record.component';

describe('ExtensionSubareaActivityAttendanceRecordComponent', () => {
  let component: ExtensionSubareaActivityAttendanceRecordComponent;
  let fixture: ComponentFixture<ExtensionSubareaActivityAttendanceRecordComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExtensionSubareaActivityAttendanceRecordComponent]
    });
    fixture = TestBed.createComponent(ExtensionSubareaActivityAttendanceRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
