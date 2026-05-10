import { Component, Input } from '@angular/core';
import { SeasonItem } from '../../../shared/models/usno.models';

@Component({
  selector: 'app-seasons-detail',
  imports: [],
  templateUrl: './seasons-detail.html',
  styleUrl: './seasons-detail.scss',
})
export class SeasonsDetail {
  @Input() item: SeasonItem | null = null;
}