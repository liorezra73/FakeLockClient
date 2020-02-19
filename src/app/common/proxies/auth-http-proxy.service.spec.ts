import { TestBed } from '@angular/core/testing';

import { AuthHttpProxyService } from './auth-http-proxy.service';

describe('AuthHttpProxyService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuthHttpProxyService = TestBed.get(AuthHttpProxyService);
    expect(service).toBeTruthy();
  });
});
