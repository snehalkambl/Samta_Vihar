import { TestBed } from '@angular/core/testing';

import { TranslationApi } from './translation-api';

describe('TranslationApi', () => {
  let service: TranslationApi;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TranslationApi);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
