import { TestBed } from '@angular/core/testing';

import { Adoptions } from './adoptions';

describe('Adoptions', () => {
  let service: Adoptions;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Adoptions);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
