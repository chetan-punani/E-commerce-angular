import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { SignupNewUser, SignUpResponse } from '../models/users.model';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authUrlSignUp = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDV2dGKqnyfMD54hskK1CW06T0z8plUAFI";
  authURLSignIn = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDV2dGKqnyfMD54hskK1CW06T0z8plUAFI";

  userSubject: Subject<SignUpResponse> = new Subject<SignUpResponse>();
  user!: SignUpResponse;
   
  constructor(private http: HttpClient) { }

  signUp(newUser: SignupNewUser): Observable<SignUpResponse>{
    return this.http.post<SignUpResponse>(this.authUrlSignUp, newUser);
  }

  signIn(user: SignupNewUser){
    return this.http.post<SignUpResponse>(this.authURLSignIn, user);
  }

}
