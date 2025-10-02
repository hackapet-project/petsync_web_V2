import { TestBed } from '@angular/core/testing';

import { Icon } from './icon';

describe('Icon', () => {
  let service: Icon;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Icon);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
