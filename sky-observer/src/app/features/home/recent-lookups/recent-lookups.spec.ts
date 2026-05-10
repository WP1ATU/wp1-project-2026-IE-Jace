import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentLookups } from './recent-lookups';

describe('RecentLookups', () => {
  let component: RecentLookups;
  let fixture: ComponentFixture<RecentLookups>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecentLookups]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecentLookups);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
