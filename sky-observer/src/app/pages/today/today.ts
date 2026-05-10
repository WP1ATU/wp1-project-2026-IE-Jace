import { Component } from '@angular/core';
import { SearchForm, SearchParams } from '../../shared/search/search-form/search-form';

@Component({
  selector: 'app-today',
  imports: [SearchForm],
  templateUrl: './today.html',
  styleUrl: './today.scss',
})
export class Today {
  lastSearch: SearchParams | null = null;

  onSearch(params: SearchParams): void {
    this.lastSearch = params;
  }
}