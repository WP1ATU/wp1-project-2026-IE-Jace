import { ChangeDetectorRef, Component } from '@angular/core';
import { finalize, timeout } from 'rxjs';
import { PersistenceApiService } from '../../core/services/persistence-api';
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
  lookupSaveError = '';

  constructor(
    private usnoApi: UsnoApiService,
    private persistenceApi: PersistenceApiService,
    private cdr: ChangeDetectorRef
  ) {}

  onSearch(params: SearchParams): void {
    const year = Number(params.year) || new Date().getFullYear();
    this.loading = true;
    this.errorMessage = '';
    this.phases = [];
    this.selected = null;
    this.cdr.detectChanges();

    this.usnoApi
      .getMoonPhasesByYear(year)
      .pipe(
        timeout(12000),
        finalize(() => {
          this.loading = false;
          this.cdr.detectChanges();
        })
      )
      .subscribe({
        next: (res) => {
          this.phases = res.phasedata ?? [];
          this.selected = this.phases[0] ?? null;
          this.recordLookup(year);
          this.cdr.detectChanges();
        },
        error: (err: Error) => {
          this.errorMessage = err.message || 'Failed to load moon phases.';
          this.cdr.detectChanges();
        },
      });
  }

  private recordLookup(year: number): void {
    this.lookupSaveError = '';

    this.persistenceApi
      .createLookup({
        kind: 'phase',
        refLabel: 'Moon Phases search',
        dateOrYear: String(year),
        notes: 'Recorded automatically from Moon Phases page',
      })
      .subscribe({
        error: () => {
          this.lookupSaveError = 'Lookup was loaded, but recent-history save failed.';
        },
      });
  }
}