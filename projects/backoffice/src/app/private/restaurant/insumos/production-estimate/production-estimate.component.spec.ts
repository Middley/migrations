import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductionEstimateComponent } from './production-estimate.component';

describe('ProductionEstimateComponent', () => {
  let component: ProductionEstimateComponent;
  let fixture: ComponentFixture<ProductionEstimateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductionEstimateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductionEstimateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
