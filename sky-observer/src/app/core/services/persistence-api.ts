import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Location } from '../../shared/models/location.model';
import { Lookup } from '../../shared/models/lookup.model';

type NewLocation = Omit<Location, '_id' | 'createdAt' | 'updatedAt'>;
type NewLookup = Omit<Lookup, '_id' | 'createdAt' | 'updatedAt'>;

@Injectable({ providedIn: 'root' })
export class PersistenceApiService {
  private readonly baseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  getLocations(): Observable<Location[]> {
    return this.http.get<Location[]>(`${this.baseUrl}/locations`);
  }

  createLocation(payload: NewLocation): Observable<Location> {
    return this.http.post<Location>(`${this.baseUrl}/locations`, payload);
  }

  getLookups(): Observable<Lookup[]> {
    return this.http.get<Lookup[]>(`${this.baseUrl}/lookups`);
  }

  createLookup(payload: NewLookup): Observable<Lookup> {
    return this.http.post<Lookup>(`${this.baseUrl}/lookups`, payload);
  }
}