import { TestBed } from '@angular/core/testing';

import { PresaleService } from './presale.service';

describe('PresaleService', () => {
  let service: PresaleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PresaleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
