import { JsonPipe } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { finalize, timeout } from 'rxjs';
import { OneDayParams, UsnoApiService } from '../../core/services/usno-api';
import { SearchForm, SearchParams } from '../../shared/search/search-form/search-form';

@Component({
  selector: 'app-today',
  imports: [SearchForm, JsonPipe],
  templateUrl: './today.html',
  styleUrl: './today.scss',
})
export class Today {
  todayData: unknown | null = null;
  errorMessage = '';
  loading = false;

  constructor(
    private usnoApi: UsnoApiService,
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
        next: (data: unknown) => {
          this.todayData = data;
          this.errorMessage = '';
          this.cdr.detectChanges();
        },
        error: (err: Error) => {
          this.errorMessage = err.message || 'Failed to load today data.';
          this.cdr.detectChanges();
        },
      });
  }
}