import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SantaMariaAreaComponent } from './santa-maria-area.component';

describe('SantaMariaAreaComponent', () => {
  let component: SantaMariaAreaComponent;
  let fixture: ComponentFixture<SantaMariaAreaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SantaMariaAreaComponent]
    });
    fixture = TestBed.createComponent(SantaMariaAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
