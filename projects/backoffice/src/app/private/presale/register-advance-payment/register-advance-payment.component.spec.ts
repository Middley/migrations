import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterAdvancePaymentComponent } from './register-advance-payment.component';

describe('RegisterAdvancePaymentComponent', () => {
  let component: RegisterAdvancePaymentComponent;
  let fixture: ComponentFixture<RegisterAdvancePaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterAdvancePaymentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterAdvancePaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
