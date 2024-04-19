import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplaySpinnerComponent } from './display-spinner.component';

describe('DisplaySpinnerComponent', () => {
  let component: DisplaySpinnerComponent;
  let fixture: ComponentFixture<DisplaySpinnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplaySpinnerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisplaySpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
