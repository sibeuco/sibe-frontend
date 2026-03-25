import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoToAreaButtonComponent } from './go-to-area-button.component';

describe('GoToAreaButtonComponent', () => {
  let component: GoToAreaButtonComponent;
  let fixture: ComponentFixture<GoToAreaButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GoToAreaButtonComponent]
    });
    fixture = TestBed.createComponent(GoToAreaButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
