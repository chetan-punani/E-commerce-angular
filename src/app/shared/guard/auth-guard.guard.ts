import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router){}
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {

    let user = localStorage.getItem('token');
    if (this.authService.user || user) {
      this.authService.user = user ? JSON.parse(user) : this.authService.user;
      this.authService.userSubject.next(this.authService.user);
      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }

}
