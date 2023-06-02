import { TestBed } from '@angular/core/testing';

import { AuthenticationAuthorizationGuard } from './authentication-authorization.guard';

describe('AuthenticationAuthorizationGuard', () => {
  let guard: AuthenticationAuthorizationGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthenticationAuthorizationGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
