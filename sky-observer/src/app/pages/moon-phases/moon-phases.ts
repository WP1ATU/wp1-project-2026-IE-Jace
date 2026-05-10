import { Component } from '@angular/core';
import { MoonDetailPanel } from '../../features/moon/moon-detail-panel/moon-detail-panel';
import { MoonResultsList } from '../../features/moon/moon-results-list/moon-results-list';
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

  onSearch(params: SearchParams): void {
    const year = params.year || new Date().getFullYear();
    this.phases = this.buildMockPhases(year);
    this.selected = this.phases[0] ?? null;
  }

  private buildMockPhases(year: number): MoonPhaseItem[] {
    return [
      { phase: 'New Moon', year, month: 1, day: 11, time: '11:57' },
      { phase: 'First Quarter', year, month: 1, day: 18, time: '03:53' },
      { phase: 'Full Moon', year, month: 1, day: 25, time: '17:54' },
      { phase: 'Last Quarter', year, month: 2, day: 2, time: '23:18' },
    ];
  }
}