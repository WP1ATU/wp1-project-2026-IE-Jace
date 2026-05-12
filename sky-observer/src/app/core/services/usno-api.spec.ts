import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

import { UsnoApiService } from './usno-api';

describe('UsnoApiService', () => {
  let service: UsnoApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(UsnoApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});