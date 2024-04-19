import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElectronicReceiptSelectorComponent } from './electronic-receipt-selector.component';

describe('ElectronicReceiptSelectorComponent', () => {
  let component: ElectronicReceiptSelectorComponent;
  let fixture: ComponentFixture<ElectronicReceiptSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ElectronicReceiptSelectorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ElectronicReceiptSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
