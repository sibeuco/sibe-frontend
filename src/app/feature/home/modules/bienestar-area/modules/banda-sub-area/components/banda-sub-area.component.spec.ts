import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BandaSubAreaComponent } from './banda-sub-area.component';

describe('BandaSubAreaComponent', () => {
  let component: BandaSubAreaComponent;
  let fixture: ComponentFixture<BandaSubAreaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BandaSubAreaComponent]
    });
    fixture = TestBed.createComponent(BandaSubAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
