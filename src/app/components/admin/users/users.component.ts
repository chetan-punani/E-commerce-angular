import { Component, OnInit } from '@angular/core';
import { UsersWithId } from 'src/app/shared/models/users.model';
import { AuthService } from 'src/app/shared/service/auth.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  userList: UsersWithId[] = [];
  id: string;
  hide: boolean = false;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.authService.getUsers().subscribe((user: UsersWithId[]) => {
      if (user) {
        this.userList = [];
        user.forEach((ele) => {
          this.userList.push(ele);
        });
      }
    })
  }

  showAddUser(): void {
    this.hide = !this.hide;
    this.id = '';
  }

  viewUser(id: string): void {
    this.id = id;
    this.hide = !this.hide;
    this.loadUsers();
  }

  // deleteUser(id: string): void {
  //   this.authService.deleteUser(id).subscribe((res: UsersWithId) => {
  //     console.log('delete :', res)
  //     this.loadUsers();
  //   });
  // }

  refreshData(value: boolean) {
    if(value) {
      this.showAddUser();
      this.loadUsers();
    }
  }

}
