import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterInvoicingComponent } from './register-invoicing.component';

describe('RegisterInvoicingComponent', () => {
  let component: RegisterInvoicingComponent;
  let fixture: ComponentFixture<RegisterInvoicingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterInvoicingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterInvoicingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
