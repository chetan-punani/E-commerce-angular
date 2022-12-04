import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SignupNewUser } from 'src/app/shared/models/users.model';
import { AuthService } from 'src/app/shared/service/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signUpForm!: FormGroup;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.signUpForm = new FormGroup({
      email: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required)
    })
  }

  signUp(){
    const newUser: SignupNewUser = {
      email: this.signUpForm.value.email,
      password: this.signUpForm.value.password,
      returnSecureToken: true
    }
    this.authService.signUp(newUser).subscribe(response => console.log("sign up response", response));
  }

}
