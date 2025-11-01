import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePrimaryButtonsComponent } from './home-primary-buttons.component';

describe('HomePrimaryButtonsComponent', () => {
  let component: HomePrimaryButtonsComponent;
  let fixture: ComponentFixture<HomePrimaryButtonsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomePrimaryButtonsComponent]
    });
    fixture = TestBed.createComponent(HomePrimaryButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
