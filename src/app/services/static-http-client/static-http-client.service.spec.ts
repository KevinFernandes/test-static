import { TestBed } from '@angular/core/testing';

import { StaticHttpClientService } from './static-http-client.service';

describe('StaticHttpClientService', () => {
  let service: StaticHttpClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StaticHttpClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
