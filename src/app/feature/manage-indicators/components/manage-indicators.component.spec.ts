import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageIndicatorsComponent } from './manage-indicators.component';

describe('ManageIndicatorsComponent', () => {
  let component: ManageIndicatorsComponent;
  let fixture: ComponentFixture<ManageIndicatorsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManageIndicatorsComponent]
    });
    fixture = TestBed.createComponent(ManageIndicatorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
