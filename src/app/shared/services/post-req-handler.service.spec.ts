import { TestBed } from '@angular/core/testing';

import { PostReqHandlerService } from './post-req-handler.service';

describe('PostReqHandlerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PostReqHandlerService = TestBed.get(PostReqHandlerService);
    expect(service).toBeTruthy();
  });
});
