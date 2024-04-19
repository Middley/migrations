import { TestBed } from '@angular/core/testing';

import { BusinessActorService } from './business-actor.service';

describe('BusinessActorService', () => {
  let service: BusinessActorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BusinessActorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
