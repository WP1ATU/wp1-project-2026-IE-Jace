import { Component } from '@angular/core';
import { MoonDetailPanel } from '../../features/moon/moon-detail-panel/moon-detail-panel';
import { MoonResultsList } from '../../features/moon/moon-results-list/moon-results-list';
import { UsnoApiService } from '../../core/services/usno-api';
import { MoonPhaseItem } from '../../shared/models/usno.models';
import { SearchForm, SearchParams } from '../../shared/search/search-form/search-form';

@Component({
  selector: 'app-moon-phases',
  imports: [SearchForm, MoonResultsList, MoonDetailPanel],
  templateUrl: './moon-phases.html',
  styleUrl: './moon-phases.scss',
})
export class MoonPhases {
  phases: MoonPhaseItem[] = [];
  selected: MoonPhaseItem | null = null;
  loading = false;
  errorMessage = '';

  constructor(private usnoApi: UsnoApiService) {}

  onSearch(params: SearchParams): void {
    const year = Number(params.year) || new Date().getFullYear();
    this.loading = true;
    this.errorMessage = '';
    this.phases = [];
    this.selected = null;

    this.usnoApi.getMoonPhasesByYear(year).subscribe({
      next: (res) => {
        this.phases = res.phasedata ?? [];
        this.selected = this.phases[0] ?? null;
        this.loading = false;
      },
      error: (err: Error) => {
        this.errorMessage = err.message || 'Failed to load moon phases.';
        this.loading = false;
      },
    });
  }
}