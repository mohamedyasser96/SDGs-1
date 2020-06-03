import { TestBed } from '@angular/core/testing';

import { SDGsService } from './sdgs.service';

describe('SdgsService', () => {
  let service: SDGsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SDGsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
