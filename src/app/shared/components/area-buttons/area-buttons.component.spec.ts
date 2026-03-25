import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AreaButtonsComponent } from './area-buttons.component';

describe('AreaButtonsComponent', () => {
  let component: AreaButtonsComponent;
  let fixture: ComponentFixture<AreaButtonsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AreaButtonsComponent]
    });
    fixture = TestBed.createComponent(AreaButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
