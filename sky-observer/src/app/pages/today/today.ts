import { ChangeDetectorRef, Component } from '@angular/core';
import { finalize, timeout } from 'rxjs';
import { PersistenceApiService } from '../../core/services/persistence-api';
import { OneDayParams, UsnoApiService } from '../../core/services/usno-api';
import { OneDayResponse } from '../../shared/models/usno.models';
import { SearchForm, SearchParams } from '../../shared/search/search-form/search-form';

@Component({
  selector: 'app-today',
  imports: [SearchForm],
  templateUrl: './today.html',
  styleUrl: './today.scss',
})
export class Today {
  todayData: OneDayResponse | null = null;
  errorMessage = '';
  loading = false;
  lookupSaveError = '';

  constructor(
    private usnoApi: UsnoApiService,
    private persistenceApi: PersistenceApiService,
    private cdr: ChangeDetectorRef
  ) {}

  onSearch(params: SearchParams): void {
    const request: OneDayParams = {
      date: params.date,
      coords: params.coords,
      tz: params.tz,
      dst: params.dst,
    };
    this.loadTodayData(request);
  }

  loadTodayData(params: OneDayParams): void {
    this.loading = true;
    this.errorMessage = '';
    this.todayData = null;
    this.cdr.detectChanges();

    this.usnoApi
      .getOneDay(params)
      .pipe(
        timeout(12000),
        finalize(() => {
          this.loading = false;
          this.cdr.detectChanges();
        })
      )
      .subscribe({
        next: (data) => {
          this.todayData = data;
          this.errorMessage = '';
          this.recordLookup(params.date);
          this.cdr.detectChanges();
        },
        error: (err: Error) => {
          this.errorMessage = err.message || 'Failed to load today data.';
          this.cdr.detectChanges();
        },
      });
  }

  private recordLookup(date: string): void {
    this.lookupSaveError = '';
    this.persistenceApi
      .createLookup({
        kind: 'day',
        refLabel: 'Today search',
        dateOrYear: date,
        notes: 'Recorded automatically from Today page',
      })
      .subscribe({
        error: () => {
          this.lookupSaveError = 'Result loaded, but recent-history save failed.';
        },
      });
  }
}