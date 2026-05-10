import { TestBed } from '@angular/core/testing';

import { UsnoApi } from './usno-api';

describe('UsnoApi', () => {
  let service: UsnoApi;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsnoApi);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
