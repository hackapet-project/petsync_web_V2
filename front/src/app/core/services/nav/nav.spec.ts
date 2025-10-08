import { TestBed } from '@angular/core/testing';

import { Nav } from './nav';

describe('Nav', () => {
  let service: Nav;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Nav);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
