import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeasonsDetail } from './seasons-detail';

describe('SeasonsDetail', () => {
  let component: SeasonsDetail;
  let fixture: ComponentFixture<SeasonsDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeasonsDetail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeasonsDetail);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
