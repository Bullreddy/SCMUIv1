import { TestBed, inject } from '@angular/core/testing';

import { ApplicationformService } from './applicationform.service';

describe('ApplicationformService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApplicationformService]
    });
  });

  it('should be created', inject([ApplicationformService], (service: ApplicationformService) => {
    expect(service).toBeTruthy();
  }));
});
