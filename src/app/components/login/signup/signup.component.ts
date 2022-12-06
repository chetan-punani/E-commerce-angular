import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SignupNewUser, SignUpResponse, Users, UsersWithId } from 'src/app/shared/models/users.model';
import { AuthService } from 'src/app/shared/service/auth.service';
import { DataService } from 'src/app/shared/service/data.service';

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

  initForm(): void {
    this.signUpForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      email: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
      dob: new FormControl(null, Validators.required),
    })
  }

  signUp(): void {
    const newUser: SignupNewUser = {
      email: this.signUpForm.value.email,
      password: this.signUpForm.value.password,
      returnSecureToken: true
    }
    this.authService.signUp(newUser).subscribe((response: SignUpResponse) => {
      console.log("sign up response", response)

      const user: Users = {
        name: this.signUpForm.value.name,
        email: this.signUpForm.value.email,
        password: this.signUpForm.value.password,
        dob: this.signUpForm.value.dob,
        role: 'user'
      }

      this.authService.addUser(user).subscribe((res: Users) => {
        console.log('firebase user add', res);

        const userWithId = {
          id: res.name,
          ...user
        }
        
        this.authService.putUser(userWithId).subscribe((res: UsersWithId) => {
          console.log('firebase user updated', res);
        })
      })
    });
  }

}
