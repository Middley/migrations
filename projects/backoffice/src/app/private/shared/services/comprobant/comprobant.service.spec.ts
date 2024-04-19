import { TestBed } from '@angular/core/testing';

import { ComprobantService } from './comprobant.service';

describe('ComprobantService', () => {
  let service: ComprobantService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComprobantService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
