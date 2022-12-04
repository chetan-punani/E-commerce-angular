import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  hide: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  showAddUser() : void {
    this.hide = !this.hide;
  }

}
