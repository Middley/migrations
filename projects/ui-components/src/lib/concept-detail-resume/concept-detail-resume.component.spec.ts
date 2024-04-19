import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConceptDetailResumeComponent } from './concept-detail-resume.component';

describe('ConceptDetailResumeComponent', () => {
  let component: ConceptDetailResumeComponent;
  let fixture: ComponentFixture<ConceptDetailResumeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConceptDetailResumeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConceptDetailResumeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
