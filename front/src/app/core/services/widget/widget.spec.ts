import { TestBed } from '@angular/core/testing';

import { Widget } from './widget';

describe('Widget', () => {
  let service: Widget;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Widget);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
