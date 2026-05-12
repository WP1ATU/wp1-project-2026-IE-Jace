import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { PersistenceApiService } from '../../core/services/persistence-api';
import { UsnoApiService } from '../../core/services/usno-api';

import { MoonPhases } from './moon-phases';

describe('MoonPhases', () => {
  let component: MoonPhases;
  let fixture: ComponentFixture<MoonPhases>;
  const usnoApiStub = {
    getMoonPhasesByYear: () => of({ apiversion: 'test', phasedata: [] }),
  };
  const persistenceApiStub = {
    createLookup: () => of({}),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MoonPhases],
      providers: [
        { provide: UsnoApiService, useValue: usnoApiStub },
        { provide: PersistenceApiService, useValue: persistenceApiStub },
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoonPhases);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
