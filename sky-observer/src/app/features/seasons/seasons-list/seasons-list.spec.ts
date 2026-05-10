import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeasonsList } from './seasons-list';

describe('SeasonsList', () => {
  let component: SeasonsList;
  let fixture: ComponentFixture<SeasonsList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeasonsList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeasonsList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
