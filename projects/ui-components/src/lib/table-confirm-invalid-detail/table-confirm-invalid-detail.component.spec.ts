import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableConfirmInvalidDetailComponent } from './table-confirm-invalid-detail.component';

describe('TableConfirmInvalidDetailComponent', () => {
  let component: TableConfirmInvalidDetailComponent;
  let fixture: ComponentFixture<TableConfirmInvalidDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableConfirmInvalidDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableConfirmInvalidDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
