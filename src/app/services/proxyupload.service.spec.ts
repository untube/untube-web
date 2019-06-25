import { TestBed } from '@angular/core/testing';

import { ProxyuploadService } from './proxyupload.service';

describe('ProxyuploadService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProxyuploadService = TestBed.get(ProxyuploadService);
    expect(service).toBeTruthy();
  });
});
