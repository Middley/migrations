import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportByConceptComponent } from './report-by-concept.component';

describe('ReportByConceptComponent', () => {
  let component: ReportByConceptComponent;
  let fixture: ComponentFixture<ReportByConceptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportByConceptComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportByConceptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
