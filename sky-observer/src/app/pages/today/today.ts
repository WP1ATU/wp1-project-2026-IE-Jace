import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { UsnoApiService } from '../../core/services/usno-api';
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

  constructor(private usnoApi: UsnoApiService) {}

  onSearch(params: SearchParams): void {
    this.loadTodayData({
      date: params.date,
      coords: params.coords,
      tz: params.tz,
      dst: params.dst,
    });
  }

  loadTodayData(params: { date: string; coords: string; tz?: number; dst?: boolean }): void {
    this.loading = true;
    this.errorMessage = '';
    this.todayData = null;

    this.usnoApi.getOneDay(params).subscribe({
      next: (data: unknown) => {
        this.todayData = data;
        this.loading = false;
      },
      error: (err: Error) => {
        this.errorMessage = err.message || 'Failed to load today data.';
        this.loading = false;
      },
    });
  }
}