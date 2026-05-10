import { Component, Input } from '@angular/core';
import { MoonPhaseItem } from '../../../shared/models/usno.models';

@Component({
  selector: 'app-moon-detail-panel',
  imports: [],
  templateUrl: './moon-detail-panel.html',
  styleUrl: './moon-detail-panel.scss',
})
export class MoonDetailPanel {
  @Input() item: MoonPhaseItem | null = null;
}