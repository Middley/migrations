import { TestBed } from '@angular/core/testing';

import { ServiceCenterAndCategoriesService } from './ServiceCenterAndCategoriesService';

describe('ServiceCenterAndCategoriesService', () => {
  let service: ServiceCenterAndCategoriesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceCenterAndCategoriesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
