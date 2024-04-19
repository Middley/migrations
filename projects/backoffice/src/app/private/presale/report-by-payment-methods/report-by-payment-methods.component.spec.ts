import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportByPaymentMethodsComponent } from './report-by-payment-methods.component';

describe('ReportByPaymentMethodsComponent', () => {
  let component: ReportByPaymentMethodsComponent;
  let fixture: ComponentFixture<ReportByPaymentMethodsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportByPaymentMethodsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportByPaymentMethodsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
