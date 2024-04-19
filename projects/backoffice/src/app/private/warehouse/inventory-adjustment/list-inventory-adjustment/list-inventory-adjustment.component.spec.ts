import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListInventoryAdjustmentComponent } from './list-inventory-adjustment.component';

describe('ListInventoryAdjustmentComponent', () => {
  let component: ListInventoryAdjustmentComponent;
  let fixture: ComponentFixture<ListInventoryAdjustmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListInventoryAdjustmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListInventoryAdjustmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
