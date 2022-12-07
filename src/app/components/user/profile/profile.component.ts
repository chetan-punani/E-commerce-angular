import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UsersWithId } from 'src/app/shared/models/users.model';
import { AuthService } from 'src/app/shared/service/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  userList: UsersWithId[] = [];
  logedInUser: UsersWithId[] = [];
  logedInUserId: string;
  addUserForm!: FormGroup;

  constructor(private authService: AuthService, private formBuilder: FormBuilder) {
    this.addUserForm = this.formBuilder.group({
      name: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
      dob: new FormControl(null, Validators.required),
    })
  }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    let userlocal = localStorage.getItem('token');
    if (userlocal) {
      let User = JSON.parse(userlocal);
      if (User.email) {
        this.authService.getUsers().subscribe((user: UsersWithId[]) => {
          if (user) {
            this.userList = [];
            user.forEach((ele) => {
              this.userList.push(ele);
            });
          }
          console.log(this.userList)
          this.logedInUser = this.userList.filter((res: UsersWithId) => {
            return res.email === User.email
          })
          console.log(this.logedInUser)

          this.logedInUser.forEach( (user: UsersWithId) => {
            this.addUserForm = new FormGroup({
              name: new FormControl(user.name),
              email: new FormControl(user.email),
              password: new FormControl(user.password),
              dob: new FormControl(user.dob)
            })
          })  
          
        })
      }
    }

  }

  addUser() {
    const newUser: UsersWithId = {
      name: this.addUserForm.value.name,
      email: this.addUserForm.value.email,
      password: this.addUserForm.value.password,
      dob: this.addUserForm.value.dob,
      role: this.addUserForm.value.role,
      id: this.logedInUser[0].id
    }

    this.authService.updateUser(newUser, newUser.id).subscribe((res: UsersWithId) => {
      console.log("updated user", res)
    });

    this.addUserForm.reset();
  }

}
