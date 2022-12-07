import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SignupNewUser, SignUpResponse, Users, UsersWithId } from 'src/app/shared/models/users.model';
import { AuthService } from 'src/app/shared/service/auth.service';

@Component({
  selector: 'app-actionon-users',
  templateUrl: './actionon-users.component.html',
  styleUrls: ['./actionon-users.component.scss']
})
export class ActiononUsersComponent implements OnInit {

  @Input() userID: string;
  isShow: boolean = false;
  addUserForm!: FormGroup;

  constructor(private authService: AuthService, private formBuilder: FormBuilder) {
    this.addUserForm = this.formBuilder.group({
      name: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
      confirmpassword: new FormControl(null, [Validators.required, Validators.minLength(6)]),
      dob: new FormControl(null, Validators.required),
      role: new FormControl(null, Validators.required),
    },
      {
        validators: this.validatingFrom('password', 'confirmpassword')
      })
  }

  ngOnInit(): void {
    // this.initaddUserForm();
    console.log('from child: ', this.userID)
    if (this.userID) {
      this.fillUserDetails();
      this.isShow = !this.isShow;
    }
  }

  initaddUserForm() {
    
  }

  validatingFrom(controlName: string, matchingControlName: string) {
    return (fromGroup: FormGroup) => {
      const control = fromGroup.controls[controlName];
      const matchingControl = fromGroup.controls[matchingControlName];
      if (matchingControl.errors) {
        return;
      }

      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ MustMatch: true })
      } else {
        matchingControl.setErrors(null)
      }
    }
  }

  fillUserDetails() {
    this.authService.getUserById(this.userID).subscribe((res: UsersWithId) => {
      console.log('res data:', res);
      this.addUserForm = new FormGroup({
        name: new FormControl(res.name),
        email: new FormControl(res.email),
        password: new FormControl(res.password),
        dob: new FormControl(res.dob),
        role: new FormControl(res.role),
      })
    });
  }

  addUser() {
    const newUser: Users = {
      name: this.addUserForm.value.name,
      email: this.addUserForm.value.email,
      password: this.addUserForm.value.password,
      dob: this.addUserForm.value.dob,
      role: this.addUserForm.value.role
    }

    if (!this.isShow) {
      const user: SignupNewUser = {
        email: this.addUserForm.value.email,
        password: this.addUserForm.value.password,
        returnSecureToken: true
      }

      this.authService.signUp(user).subscribe((response: SignUpResponse) => {
        console.log("sign up response", response)

        this.authService.addUser(newUser).subscribe((res: Users) => {
          console.log('firebase user add', res);

          const userWithId = {
            id: res.name,
            ...newUser
          }

          this.authService.putUser(userWithId).subscribe((res: UsersWithId) => {
            console.log('firebase user updated', res);
          })
        })
      });

    } else {
      const userWithId: UsersWithId = {
        id: this.userID,
        ...newUser
      }
      this.authService.updateUser(userWithId, this.userID).subscribe((res: UsersWithId) => {
        console.log("updated user", res)
      });
    }
    this.addUserForm.reset();
  }

  resetForm() {
    this.addUserForm.reset();
  }

}
