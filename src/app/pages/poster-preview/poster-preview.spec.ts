import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PosterPreview } from './poster-preview';

describe('PosterPreview', () => {
  let component: PosterPreview;
  let fixture: ComponentFixture<PosterPreview>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PosterPreview],
    }).compileComponents();

    fixture = TestBed.createComponent(PosterPreview);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
