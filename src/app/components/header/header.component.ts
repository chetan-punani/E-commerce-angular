import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartWithID } from 'src/app/shared/models/product.model';
import { DataService } from 'src/app/shared/service/data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  showLogIn: boolean = false;
  logedInUserEmail: string;
  cardItem: CartWithID[];
  cartCount: number = 0;
  isAdmin: boolean = false;

  constructor(private router: Router, private dataService: DataService) { 
    this.router.events.subscribe(() => {
      let userlocal = this.dataService.getLocalStorageUser();
      if (userlocal) {
        this.logedInUserEmail = userlocal.email;
        this.showLogIn = true;
        if(userlocal.email === 'admin@gmail.com') {
          this.isAdmin = true;
        }
      }
    })
  }

  ngOnInit(): void {
    this.getcartCount();
  }

  logout() {
    if (localStorage.getItem('token')) {
      localStorage.removeItem('token');
    }
    this.cartCount = 0;
    this.showLogIn = false;
    this.router.navigate(['/login'])
  }

  getcartCount() {
    this.cardItem = [];
    let userlocal = this.dataService.getLocalStorageUser();
    if(userlocal) {
      this.logedInUserEmail = userlocal.email;
      this.dataService.getCarts().subscribe( (res: CartWithID[]) => {
        if(res.length > 0) {
          this.cardItem = res.filter( (res: CartWithID) => {
            return (res.userEmail === userlocal.email);
          });
          this.cartCount = this.cardItem.length;
        } 
      })
    }
  }

}
