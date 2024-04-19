import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableByGroupComponent } from './table-by-group.component';

describe('TableConceptReportComponent', () => {
  let component: TableByGroupComponent;
  let fixture: ComponentFixture<TableByGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TableByGroupComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TableByGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
