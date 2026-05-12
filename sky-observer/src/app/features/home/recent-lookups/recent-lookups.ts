import { Component, Input } from '@angular/core';
import { Lookup } from '../../../shared/models/lookup.model';

@Component({
  selector: 'app-recent-lookups',
  imports: [],
  templateUrl: './recent-lookups.html',
  styleUrl: './recent-lookups.scss',
})
export class RecentLookups {
  @Input() lookups: Lookup[] = [];
  @Input() loading = false;
  @Input() errorMessage = '';

  toDisplayType(kind: string): string {
    if (kind === 'phase') return 'Moon Phases';
    if (kind === 'day') return 'Today';
    if (kind === 'season') return 'Seasons';
    return kind;
  }
}
