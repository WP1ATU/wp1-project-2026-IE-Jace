import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs';
import { PersistenceApiService } from '../../core/services/persistence-api';
import { FeatureCards } from '../../features/home/feature-cards/feature-cards';
import { Hero } from '../../features/home/hero/hero';
import { RecentLookups } from '../../features/home/recent-lookups/recent-lookups';
import { CreateLocationPayload, SavedLocations } from '../../features/home/saved-locations/saved-locations';
import { Location } from '../../shared/models/location.model';
import { Lookup } from '../../shared/models/lookup.model';

@Component({
  selector: 'app-home',
  imports: [Hero, FeatureCards, SavedLocations, RecentLookups],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit {
  locations: Location[] = [];
  lookups: Lookup[] = [];
  loadingLocations = false;
  loadingLookups = false;
  savingLocation = false;
  locationErrorMessage = '';
  lookupErrorMessage = '';
  locationSaveMessage = '';

  constructor(private persistenceApi: PersistenceApiService) {}

  ngOnInit(): void {
    this.loadLocations();
    this.loadLookups();
  }

  onCreateLocation(payload: CreateLocationPayload): void {
    this.savingLocation = true;
    this.locationSaveMessage = '';

    this.persistenceApi
      .createLocation(payload)
      .pipe(finalize(() => (this.savingLocation = false)))
      .subscribe({
        next: (created) => {
          this.locationSaveMessage = `${created.label} saved.`;
          this.locationErrorMessage = '';
          this.loadLocations();
        },
        error: (err: Error) => {
          this.locationErrorMessage = err.message || 'Unable to save location.';
        },
      });
  }

  loadLocations(): void {
    this.loadingLocations = true;
    this.locationErrorMessage = '';

    this.persistenceApi
      .getLocations()
      .pipe(finalize(() => (this.loadingLocations = false)))
      .subscribe({
        next: (locations) => (this.locations = locations),
        error: (err: Error) => {
          this.locations = [];
          this.locationErrorMessage = err.message || 'Unable to load saved locations.';
        },
      });
  }

  loadLookups(): void {
    this.loadingLookups = true;
    this.lookupErrorMessage = '';

    this.persistenceApi
      .getLookups()
      .pipe(finalize(() => (this.loadingLookups = false)))
      .subscribe({
        next: (lookups) => (this.lookups = lookups),
        error: (err: Error) => {
          this.lookups = [];
          this.lookupErrorMessage = err.message || 'Unable to load recent lookups.';
        },
      });
  }
}