import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoonPhases } from './moon-phases';

describe('MoonPhases', () => {
  let component: MoonPhases;
  let fixture: ComponentFixture<MoonPhases>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MoonPhases]
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
