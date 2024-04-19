import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchByCriterionComponent } from './search-by-criterion.component';

describe('SearchByCriterionComponent', () => {
  let component: SearchByCriterionComponent;
  let fixture: ComponentFixture<SearchByCriterionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchByCriterionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchByCriterionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
