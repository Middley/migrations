import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComprobantViewerComponent } from './comprobant-viewer.component';

describe('ComprobantViewerComponent', () => {
  let component: ComprobantViewerComponent;
  let fixture: ComponentFixture<ComprobantViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComprobantViewerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComprobantViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
