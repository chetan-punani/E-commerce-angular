import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SignupNewUser, SignUpResponse } from 'src/app/shared/models/users.model';
import { AuthService } from 'src/app/shared/service/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  signInForm!: FormGroup;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.signInForm = new FormGroup({
      email: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required)
    })
  }

  signIn(): void {
    const user: SignupNewUser = {
      email: this.signInForm.value.email,
      password: this.signInForm.value.password,
      returnSecureToken: true
    }

    this.authService.signIn(user).subscribe((userResponse: SignUpResponse) =>{
      console.log("Signed In User", userResponse);
      this.authService.userSubject.next(userResponse);
      this.authService.user = userResponse;
      localStorage.setItem("token",JSON.stringify(this.authService.user));
      this.router.navigate([''])
    })
  }
  
}
