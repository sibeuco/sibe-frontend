import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BienestarAreaComponent } from './bienestar-area.component';

describe('BienestarAreaComponent', () => {
  let component: BienestarAreaComponent;
  let fixture: ComponentFixture<BienestarAreaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BienestarAreaComponent]
    });
    fixture = TestBed.createComponent(BienestarAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
