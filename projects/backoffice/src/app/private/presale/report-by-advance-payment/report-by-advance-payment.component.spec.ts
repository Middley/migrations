import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportByAdvancePaymentComponent } from './report-by-advance-payment.component';

describe('ReportByAdvancePaymentComponent', () => {
  let component: ReportByAdvancePaymentComponent;
  let fixture: ComponentFixture<ReportByAdvancePaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportByAdvancePaymentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportByAdvancePaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
