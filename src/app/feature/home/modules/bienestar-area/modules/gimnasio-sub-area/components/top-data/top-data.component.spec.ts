import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopDataComponent } from './top-data.component';

describe('TopDataComponent', () => {
  let component: TopDataComponent;
  let fixture: ComponentFixture<TopDataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TopDataComponent]
    });
    fixture = TestBed.createComponent(TopDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
