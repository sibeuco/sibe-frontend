import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AreaUsersComponent } from './area-users.component';

describe('AreaUsersComponent', () => {
  let component: AreaUsersComponent;
  let fixture: ComponentFixture<AreaUsersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AreaUsersComponent]
    });
    fixture = TestBed.createComponent(AreaUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
