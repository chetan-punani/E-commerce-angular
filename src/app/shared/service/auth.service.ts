import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { SignupNewUser, SignUpResponse, UsersWithId, Users } from '../models/users.model';
import { map, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authUrlSignUp = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDV2dGKqnyfMD54hskK1CW06T0z8plUAFI";
  authURLSignIn = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDV2dGKqnyfMD54hskK1CW06T0z8plUAFI";
  firebaseURL = "https://bcommerce-c702b-default-rtdb.firebaseio.com/";

  userSubject: Subject<SignUpResponse> = new Subject<SignUpResponse>();
  user!: SignUpResponse;
  userObj: SignupNewUser;
   
  constructor(private http: HttpClient) { }

  signUp(newUser: SignupNewUser): Observable<SignUpResponse>{
    return this.http.post<SignUpResponse>(this.authUrlSignUp, newUser);
  }

  signIn(user: SignupNewUser): Observable<SignUpResponse> {
    return this.http.post<SignUpResponse>(this.authURLSignIn, user);
  }

  getUsers(): Observable<UsersWithId[]> {
    return this.http.get<UsersWithId[]>(this.firebaseURL + `user.json`)
      .pipe(map(user => {
        return (this.converter(user));
      }));
  }

  getUserById(id: string): Observable<UsersWithId> {
    return this.http.get<UsersWithId>(this.firebaseURL + `/user/${id}.json`);
  }

  addUser(user: Users): Observable<Users>  {
    return this.http.post<Users>(this.firebaseURL + `/user.json`, user);
  }

  putUser(user: UsersWithId): Observable<UsersWithId>  {
    return this.http.patch<UsersWithId>(this.firebaseURL + `/user/${user.id}/.json`, user);
  }

  updateUser(user: UsersWithId, id : string): Observable<UsersWithId>  {
    return this.http.patch<UsersWithId>(this.firebaseURL + `/user/${id}/.json`, user);
  }

  deleteUser(id: string): Observable<UsersWithId>  {
    return this.http.delete<UsersWithId>(this.firebaseURL + `/user/${id}.json`);
  }

  private converter( userObj: any ) {
    const users: UsersWithId[] = [];
    Object.keys( userObj ).forEach( key => {
      const user: UsersWithId = userObj[key];
      users.push( user );
    });
    return users;
  }

}
