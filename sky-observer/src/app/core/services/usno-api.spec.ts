import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';

import { UsnoApiService } from './usno-api';

describe('UsnoApiService', () => {
  let service: UsnoApiService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(UsnoApiService);
    http = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    http.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call moon phases year endpoint', () => {
    service.getMoonPhasesByYear(2026).subscribe();

    const req = http.expectOne((request) => request.url.includes('/usno/moon/phases/year'));
    expect(req.request.method).toBe('GET');
    expect(req.request.params.get('year')).toBe('2026');
    expect(req.request.params.get('_ts')).toBeTruthy();
    req.flush({ apiversion: 'test', phasedata: [] });
  });

  it('should call one day endpoint with params', () => {
    service
      .getOneDay({ date: '2026-03-01', coords: '51.50,-0.12', tz: 0, dst: false })
      .subscribe();

    const req = http.expectOne((request) => request.url.includes('/usno/rstt/oneday'));
    expect(req.request.params.get('date')).toBe('2026-03-01');
    expect(req.request.params.get('coords')).toBe('51.50,-0.12');
    expect(req.request.params.get('tz')).toBe('0');
    expect(req.request.params.get('dst')).toBe('false');
    req.flush({ sun: {}, moon: {} });
  });

  it('should call seasons endpoint with year', () => {
    service.getSeasons({ year: 2026, tz: 0, dst: false }).subscribe();

    const req = http.expectOne((request) => request.url.includes('/usno/seasons'));
    expect(req.request.method).toBe('GET');
    expect(req.request.params.get('year')).toBe('2026');
    req.flush({ data: [] });
  });
});