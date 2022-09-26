import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthenticationService} from 'src/app/services/security/authentication.service';

@Injectable()
export class AuthGuardGuard implements CanActivate {
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (sessionStorage.getItem('tk')) {
      return this.authenticationService.secureRoute(state.url);
    } else {
      this.router.navigate(['/log-in']);
      return false;
    }
  }

}
