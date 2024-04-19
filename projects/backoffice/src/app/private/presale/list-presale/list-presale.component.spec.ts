import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPresaleComponent } from './list-presale.component';

describe('ListPresaleComponent', () => {
  let component: ListPresaleComponent;
  let fixture: ComponentFixture<ListPresaleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListPresaleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListPresaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
