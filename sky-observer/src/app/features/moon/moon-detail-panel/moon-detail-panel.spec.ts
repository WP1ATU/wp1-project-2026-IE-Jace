import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoonDetailPanel } from './moon-detail-panel';

describe('MoonDetailPanel', () => {
  let component: MoonDetailPanel;
  let fixture: ComponentFixture<MoonDetailPanel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MoonDetailPanel]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoonDetailPanel);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
