import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface OneDayParams {
  date: string;
  coords: string;
  tz?: number;
  dst?: boolean;
}

@Injectable({ providedIn: 'root' })
export class UsnoApiService {
  constructor(private http: HttpClient) {}

  getOneDay(params: OneDayParams): Observable<unknown> {
    let httpParams = new HttpParams()
      .set('date', params.date)
      .set('coords', params.coords);

    if (params.tz !== undefined) httpParams = httpParams.set('tz', String(params.tz));
    if (params.dst !== undefined) httpParams = httpParams.set('dst', params.dst ? 'true' : 'false');

    return this.http.get<unknown>(`${environment.apiBaseUrl}/usno/rstt/oneday`, {
      params: httpParams,
    });
  }
}