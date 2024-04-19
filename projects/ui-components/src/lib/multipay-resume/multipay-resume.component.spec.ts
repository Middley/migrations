import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultipayResumeComponent } from './multipay-resume.component';

describe('MultipayResumeComponent', () => {
  let component: MultipayResumeComponent;
  let fixture: ComponentFixture<MultipayResumeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MultipayResumeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MultipayResumeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
