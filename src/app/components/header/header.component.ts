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

  constructor(private router: Router, private dataService: DataService) { 
    this.router.events.subscribe(() => {
      let userlocal = localStorage.getItem('token');
      if (userlocal) {
        let User = JSON.parse(userlocal)
        this.logedInUserEmail = User.email;
        this.showLogIn = true;
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
    this.showLogIn = false;
    this.router.navigate(['/login'])
  }

  getcartCount() {
    this.cardItem = [];
    let userlocal = localStorage.getItem('token');
    if(userlocal) {
      let User = JSON.parse(userlocal); 
      this.logedInUserEmail = User.email;
      this.dataService.getCarts().subscribe( (res: CartWithID[]) => {
        console.log('get cart-', res)
        if(res.length > 0) {
          this.cardItem = res.filter( (res: CartWithID) => {
            return (res.userEmail === User.email);
          });
          this.cartCount = this.cardItem.length;
        } 
      })
    }
  }

}
