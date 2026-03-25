import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrincipalHomeComponent } from './principal-home.component';

describe('PrincipalHomeComponent', () => {
  let component: PrincipalHomeComponent;
  let fixture: ComponentFixture<PrincipalHomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PrincipalHomeComponent]
    });
    fixture = TestBed.createComponent(PrincipalHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
