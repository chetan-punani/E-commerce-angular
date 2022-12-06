import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/service/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.getUserData();
  }

  getUserData(): void {
    let userlocal = localStorage.getItem('token');
    if(userlocal) {
      let User = JSON.parse(userlocal); 
      if(User.email) {
        // this.authService.getUsers().subscribe( (res: any))
      }
    }
  }

}
