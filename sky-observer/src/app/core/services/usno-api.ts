import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { MoonPhasesResponse, OneDayResponse, SeasonsResponse } from '../../shared/models/usno.models';

export interface OneDayParams {
  date: string;
  coords: string;
  tz?: number;
  dst?: boolean;
}

@Injectable({ providedIn: 'root' })
export class UsnoApiService {
  constructor(private http: HttpClient) {}

  private withNoCache(params: HttpParams): HttpParams {
    return params.set('_ts', Date.now().toString());
  }

  getMoonPhasesByYear(year: number): Observable<MoonPhasesResponse> {
    let params = new HttpParams().set('year', String(year));
    params = this.withNoCache(params);

    return this.http.get<MoonPhasesResponse>(`${environment.apiBaseUrl}/usno/moon/phases/year`, { params });
  }

  getOneDay(params: OneDayParams): Observable<OneDayResponse> {
    let httpParams = new HttpParams()
      .set('date', params.date)
      .set('coords', params.coords);

    if (params.tz !== undefined) httpParams = httpParams.set('tz', String(params.tz));
    if (params.dst !== undefined) httpParams = httpParams.set('dst', params.dst ? 'true' : 'false');

    httpParams = this.withNoCache(httpParams);

    return this.http.get<OneDayResponse>(`${environment.apiBaseUrl}/usno/rstt/oneday`, { params: httpParams });
  }

  getSeasons(params: { year: number; tz?: number; dst?: boolean }): Observable<SeasonsResponse> {
    let httpParams = new HttpParams().set('year', String(params.year));

    if (params.tz !== undefined) httpParams = httpParams.set('tz', String(params.tz));
    if (params.dst !== undefined) httpParams = httpParams.set('dst', params.dst ? 'true' : 'false');

    httpParams = this.withNoCache(httpParams);

    return this.http.get<SeasonsResponse>(`${environment.apiBaseUrl}/usno/seasons`, { params: httpParams });
  }
}