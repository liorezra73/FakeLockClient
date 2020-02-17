import { TestBed, async, inject } from '@angular/core/testing';

import { IdGuard } from './id.guard';

describe('IdGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IdGuard]
    });
  });

  it('should ...', inject([IdGuard], (guard: IdGuard) => {
    expect(guard).toBeTruthy();
  }));
});
