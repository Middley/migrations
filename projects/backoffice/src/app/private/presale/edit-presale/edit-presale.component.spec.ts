import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPresaleComponent } from './edit-presale.component';

describe('EditPresaleComponent', () => {
  let component: EditPresaleComponent;
  let fixture: ComponentFixture<EditPresaleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditPresaleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditPresaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
