import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MoonPhaseItem } from '../../../shared/models/usno.models';

@Component({
  selector: 'app-moon-results-list',
  imports: [],
  templateUrl: './moon-results-list.html',
  styleUrl: './moon-results-list.scss',
})
export class MoonResultsList {
  @Input() items: MoonPhaseItem[] = [];
  @Output() selectItem = new EventEmitter<MoonPhaseItem>();

  onSelect(item: MoonPhaseItem): void {
    this.selectItem.emit(item);
  }
}