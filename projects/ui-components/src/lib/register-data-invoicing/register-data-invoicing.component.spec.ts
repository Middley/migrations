import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterDataInvoicingComponent } from './register-data-invoicing.component';

describe('RegisterDataInvoicingComponent', () => {
  let component: RegisterDataInvoicingComponent;
  let fixture: ComponentFixture<RegisterDataInvoicingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterDataInvoicingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterDataInvoicingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
