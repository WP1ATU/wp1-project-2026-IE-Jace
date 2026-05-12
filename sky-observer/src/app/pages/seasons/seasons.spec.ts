import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { PersistenceApiService } from '../../core/services/persistence-api';
import { UsnoApiService } from '../../core/services/usno-api';

import { Seasons } from './seasons';

describe('Seasons', () => {
  let component: Seasons;
  let fixture: ComponentFixture<Seasons>;
  const usnoApiStub = {
    getSeasons: () => of({ data: [] }),
  };
  const persistenceApiStub = {
    createLookup: () => of({}),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Seasons],
      providers: [
        { provide: UsnoApiService, useValue: usnoApiStub },
        { provide: PersistenceApiService, useValue: persistenceApiStub },
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(Seasons);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
