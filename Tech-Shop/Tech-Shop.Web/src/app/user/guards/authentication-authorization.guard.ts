import { AuthenticationAuthorizationService } from './../services/authentication-authorization.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()
export class AuthenticationAuthorizationGuard implements CanActivate {
  constructor(private authenticationAuthorizationService: AuthenticationAuthorizationService) {

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      let token: string | null = localStorage.getItem('token');
      if(this.authenticationAuthorizationService.$isUserLoggedIn(token)) {
        let role: string = route.data['role'];
        if(role) {
          return this.authenticationAuthorizationService.$isUserEligible(token!, role);
        }

        return true;
      }

      return false;
  }
  
}
