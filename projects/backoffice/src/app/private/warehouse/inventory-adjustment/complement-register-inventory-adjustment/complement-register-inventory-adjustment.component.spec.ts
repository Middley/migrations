import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplementRegisterInventoryAdjustmentComponent } from './complement-register-inventory-adjustment.component';

describe('ComplementRegisterInventoryAdjustmentComponent', () => {
  let component: ComplementRegisterInventoryAdjustmentComponent;
  let fixture: ComponentFixture<ComplementRegisterInventoryAdjustmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComplementRegisterInventoryAdjustmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComplementRegisterInventoryAdjustmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
