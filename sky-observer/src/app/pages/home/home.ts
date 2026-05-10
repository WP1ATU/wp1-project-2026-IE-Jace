import { Component } from '@angular/core';
import { FeatureCards } from '../../features/home/feature-cards/feature-cards';
import { Hero } from '../../features/home/hero/hero';
import { RecentLookups } from '../../features/home/recent-lookups/recent-lookups';
import { SavedLocations } from '../../features/home/saved-locations/saved-locations';

@Component({
  selector: 'app-home',
  imports: [Hero, FeatureCards, SavedLocations, RecentLookups],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {}