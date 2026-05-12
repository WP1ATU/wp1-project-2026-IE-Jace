import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { PersistenceApiService } from '../../core/services/persistence-api';
import { UsnoApiService } from '../../core/services/usno-api';

import { Today } from './today';

describe('Today', () => {
  let component: Today;
  let fixture: ComponentFixture<Today>;
  const usnoApiStub = {
    getOneDay: () => of({ input: {}, sun: {}, moon: {} }),
  };
  const persistenceApiStub = {
    createLookup: () => of({}),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Today],
      providers: [
        { provide: UsnoApiService, useValue: usnoApiStub },
        { provide: PersistenceApiService, useValue: persistenceApiStub },
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(Today);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
