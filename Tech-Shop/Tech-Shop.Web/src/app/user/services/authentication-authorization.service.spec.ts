import { TestBed } from '@angular/core/testing';

import { AuthenticationAuthorizationService } from './authentication-authorization.service';

describe('AuthenticationAuthorizationService', () => {
  let service: AuthenticationAuthorizationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthenticationAuthorizationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
