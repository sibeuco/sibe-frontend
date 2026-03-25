import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterNewProjectComponent } from './register-new-project.component';

describe('RegisterNewProjectComponent', () => {
  let component: RegisterNewProjectComponent;
  let fixture: ComponentFixture<RegisterNewProjectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterNewProjectComponent]
    });
    fixture = TestBed.createComponent(RegisterNewProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
