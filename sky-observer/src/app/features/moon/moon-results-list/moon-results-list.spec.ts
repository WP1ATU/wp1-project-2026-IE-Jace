import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoonResultsList } from './moon-results-list';

describe('MoonResultsList', () => {
  let component: MoonResultsList;
  let fixture: ComponentFixture<MoonResultsList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MoonResultsList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoonResultsList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
