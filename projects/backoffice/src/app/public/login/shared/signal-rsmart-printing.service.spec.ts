import { TestBed } from '@angular/core/testing';

import { SignalRSmartPrintingService } from './signal-rsmart-printing.service';

describe('SignalRSmartPrintingService', () => {
  let service: SignalRSmartPrintingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SignalRSmartPrintingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
