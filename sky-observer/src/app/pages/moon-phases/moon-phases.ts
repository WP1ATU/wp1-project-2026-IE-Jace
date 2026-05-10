import { Component } from '@angular/core';
import { SearchForm, SearchParams } from '../../shared/search/search-form/search-form';

@Component({
  selector: 'app-moon-phases',
  imports: [SearchForm],
  templateUrl: './moon-phases.html',
  styleUrl: './moon-phases.scss',
})
export class MoonPhases {
  lastSearch: SearchParams | null = null;

  onSearch(params: SearchParams): void {
    this.lastSearch = params;
  }
}