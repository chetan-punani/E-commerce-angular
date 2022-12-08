import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersWithId } from 'src/app/shared/models/users.model';
import { AuthService } from 'src/app/shared/service/auth.service';
import { DataService } from 'src/app/shared/service/data.service';

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

  constructor(private authService: AuthService, private formBuilder: FormBuilder, private router: Router
    ,private dataService: DataService) {
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
    let userlocal = this.dataService.getLocalStorageUser();
    if (userlocal) {
      if (userlocal.email) {
        this.authService.getUsers().subscribe((user: UsersWithId[]) => {
          if (user) {
            this.userList = [];
            user.forEach((ele) => {
              this.userList.push(ele);
            });
          }
          this.logedInUser = this.userList.filter((res: UsersWithId) => {
            return res.email === userlocal.email
          })

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
      this.addUserForm.reset();
    });

  }

  logout() {
    if (localStorage.getItem('token')) {
      localStorage.removeItem('token');
    }
    this.router.navigate(['/login'])
  }


}
