import { TestBed, inject } from '@angular/core/testing';

import { StudentserviceService } from './studentservice.service';

describe('StudentserviceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StudentserviceService]
    });
  });

  it('should be created', inject([StudentserviceService], (service: StudentserviceService) => {
    expect(service).toBeTruthy();
  }));
});
