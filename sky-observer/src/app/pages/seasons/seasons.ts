import { Component } from '@angular/core';
import { SearchForm, SearchParams } from '../../shared/search/search-form/search-form';

@Component({
  selector: 'app-seasons',
  imports: [SearchForm],
  templateUrl: './seasons.html',
  styleUrl: './seasons.scss',
})
export class Seasons {
  lastSearch: SearchParams | null = null;

  onSearch(params: SearchParams): void {
    this.lastSearch = params;
  }
}