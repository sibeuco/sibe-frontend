import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterNewActionComponent } from './register-new-action.component';

describe('RegisterNewActionComponent', () => {
  let component: RegisterNewActionComponent;
  let fixture: ComponentFixture<RegisterNewActionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterNewActionComponent]
    });
    fixture = TestBed.createComponent(RegisterNewActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
