import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportByBasicConceptComponent } from './report-by-basic-concept.component';

describe('ReportByBasicConceptComponent', () => {
  let component: ReportByBasicConceptComponent;
  let fixture: ComponentFixture<ReportByBasicConceptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportByBasicConceptComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportByBasicConceptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
