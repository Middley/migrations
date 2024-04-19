import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentTraceEditorComponent } from './payment-trace-editor.component';

describe('PaymentTraceEditorComponent', () => {
  let component: PaymentTraceEditorComponent;
  let fixture: ComponentFixture<PaymentTraceEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentTraceEditorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentTraceEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
