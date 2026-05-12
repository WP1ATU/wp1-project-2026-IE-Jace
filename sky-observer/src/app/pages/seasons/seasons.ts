import { ChangeDetectorRef, Component } from '@angular/core';
import { finalize, timeout } from 'rxjs';
import { PersistenceApiService } from '../../core/services/persistence-api';
import { SeasonsDetail } from '../../features/seasons/seasons-detail/seasons-detail';
import { SeasonsList } from '../../features/seasons/seasons-list/seasons-list';
import { UsnoApiService } from '../../core/services/usno-api';
import { SeasonItem } from '../../shared/models/usno.models';
import { SearchForm, SearchParams } from '../../shared/search/search-form/search-form';

@Component({
  selector: 'app-seasons',
  imports: [SearchForm, SeasonsList, SeasonsDetail],
  templateUrl: './seasons.html',
  styleUrl: './seasons.scss',
})
export class Seasons {
  seasons: SeasonItem[] = [];
  selected: SeasonItem | null = null;
  loading = false;
  errorMessage = '';
  lookupSaveError = '';

  constructor(
    private usnoApi: UsnoApiService,
    private persistenceApi: PersistenceApiService,
    private cdr: ChangeDetectorRef
  ) {}

  onSearch(params: SearchParams): void {
    this.loadSeasons(params.year, params.tz, params.dst);
  }

  loadSeasons(year: number, tz?: number, dst?: boolean): void {
    this.loading = true;
    this.errorMessage = '';
    this.seasons = [];
    this.selected = null;
    this.cdr.detectChanges();

    this.usnoApi
      .getSeasons({ year, tz, dst })
      .pipe(
        timeout(12000),
        finalize(() => {
          this.loading = false;
          this.cdr.detectChanges();
        })
      )
      .subscribe({
        next: (res) => {
          this.seasons = res.data ?? [];
          this.selected = this.seasons[0] ?? null;
          this.errorMessage = '';
          this.recordLookup(year);
          this.cdr.detectChanges();
        },
        error: (err: Error) => {
          this.errorMessage = err.message || 'Failed to load seasons.';
          this.cdr.detectChanges();
        },
      });
  }

  private recordLookup(year: number): void {
    this.lookupSaveError = '';
    this.persistenceApi
      .createLookup({
        kind: 'season',
        refLabel: 'Seasons search',
        dateOrYear: String(year),
        notes: 'Recorded automatically from Seasons page',
      })
      .subscribe({
        error: () => {
          this.lookupSaveError = 'Result loaded, but recent-history save failed.';
        },
      });
  }
}