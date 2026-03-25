import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterNewIndicatorComponent } from './register-new-indicator.component';

describe('RegisterNewIndicatorComponent', () => {
  let component: RegisterNewIndicatorComponent;
  let fixture: ComponentFixture<RegisterNewIndicatorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterNewIndicatorComponent]
    });
    fixture = TestBed.createComponent(RegisterNewIndicatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
