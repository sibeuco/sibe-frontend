import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BottonDataContainerComponent } from './botton-data-container.component';

describe('BottonDataContainerComponent', () => {
  let component: BottonDataContainerComponent;
  let fixture: ComponentFixture<BottonDataContainerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BottonDataContainerComponent]
    });
    fixture = TestBed.createComponent(BottonDataContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
