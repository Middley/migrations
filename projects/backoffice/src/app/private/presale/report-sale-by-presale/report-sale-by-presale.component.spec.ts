import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportSaleByPresaleComponent } from './report-sale-by-presale.component';

describe('ReportSaleByPresaleComponent', () => {
  let component: ReportSaleByPresaleComponent;
  let fixture: ComponentFixture<ReportSaleByPresaleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportSaleByPresaleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportSaleByPresaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
