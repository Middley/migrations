import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssociationServiceCenterAndCategoriesComponent } from './AssociationServiceCenterAndCategoriesComponent';

describe('AssociationServiceCenterAndCategoriesComponent', () => {
  let component: AssociationServiceCenterAndCategoriesComponent;
  let fixture: ComponentFixture<AssociationServiceCenterAndCategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AssociationServiceCenterAndCategoriesComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AssociationServiceCenterAndCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
