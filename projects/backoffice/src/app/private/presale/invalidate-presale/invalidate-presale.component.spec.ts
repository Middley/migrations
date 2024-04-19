import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvalidatePresaleComponent } from './invalidate-presale.component';

describe('InvalidatePresaleComponent', () => {
  let component: InvalidatePresaleComponent;
  let fixture: ComponentFixture<InvalidatePresaleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvalidatePresaleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvalidatePresaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
