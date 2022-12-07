import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  
  constructor(private authService: AuthService, private router: Router){}
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      let user = localStorage.getItem('token');
      if (user) {
        let User = JSON.parse(user);
        console.log('')
        if(User.email === 'admin@gmail.com') {
          console.log('admin access');
          return true;
        }
      }

      this.router.navigate(['/']);
    return false;
  }
  
}
