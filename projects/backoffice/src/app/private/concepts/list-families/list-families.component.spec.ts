import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListFamiliesComponent } from './list-families.component';

describe('ListFamiliesComponent', () => {
  let component: ListFamiliesComponent;
  let fixture: ComponentFixture<ListFamiliesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListFamiliesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListFamiliesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
