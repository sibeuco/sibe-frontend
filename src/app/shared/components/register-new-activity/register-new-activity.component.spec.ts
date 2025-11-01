import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterNewActivityComponent } from './register-new-activity.component';

describe('RegisterNewActivityComponent', () => {
  let component: RegisterNewActivityComponent;
  let fixture: ComponentFixture<RegisterNewActivityComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterNewActivityComponent]
    });
    fixture = TestBed.createComponent(RegisterNewActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
