import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableSummaryAndDetailComponent } from './table-summary-and-detail.component';

describe('TableSummaryAndDetailComponent', () => {
  let component: TableSummaryAndDetailComponent;
  let fixture: ComponentFixture<TableSummaryAndDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableSummaryAndDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableSummaryAndDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
