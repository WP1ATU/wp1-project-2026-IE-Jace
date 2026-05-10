import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SeasonItem } from '../../../shared/models/usno.models';

@Component({
  selector: 'app-seasons-list',
  imports: [],
  templateUrl: './seasons-list.html',
  styleUrl: './seasons-list.scss',
})
export class SeasonsList {
  @Input() items: SeasonItem[] = [];
  @Output() selectItem = new EventEmitter<SeasonItem>();

  onSelect(item: SeasonItem): void {
    this.selectItem.emit(item);
  }
}