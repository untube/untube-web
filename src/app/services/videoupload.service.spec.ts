import { TestBed } from '@angular/core/testing';
 
import { VideouploadService } from './videoupload.service';

describe('VideouploadService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VideouploadService = TestBed.get(VideouploadService);
    expect(service).toBeTruthy();
  });
});
