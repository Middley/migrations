import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowPresaleComponent } from './show-presale.component';

describe('ShowPresaleComponent', () => {
  let component: ShowPresaleComponent;
  let fixture: ComponentFixture<ShowPresaleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowPresaleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowPresaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
