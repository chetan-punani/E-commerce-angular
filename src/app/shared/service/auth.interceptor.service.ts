import { HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { exhaustMap, Observable } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor{

  constructor(private authService: AuthService){}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
    
    let user = localStorage.getItem('token');
    if(this.authService.user || user){
      this.authService.user = user ? JSON.parse(user) : this.authService.user;
      this.authService.userSubject.next(this.authService.user);
      const modifiedReq = req.clone({
        params: new HttpParams().set('auth', this.authService.user.idToken)
      })

      return next.handle(modifiedReq);
    }
    return next.handle(req);
  }
}
