import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartmentUsersComponent } from './department-users.component';

describe('DepartmentUsersComponent', () => {
  let component: DepartmentUsersComponent;
  let fixture: ComponentFixture<DepartmentUsersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DepartmentUsersComponent]
    });
    fixture = TestBed.createComponent(DepartmentUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
