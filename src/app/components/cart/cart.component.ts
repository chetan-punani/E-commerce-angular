import { Component, OnInit } from '@angular/core';
import { CartWithID } from 'src/app/shared/models/product.model';
import { AuthService } from 'src/app/shared/service/auth.service';
import { DataService } from 'src/app/shared/service/data.service';
import { UsersComponent } from '../admin/users/users.component';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  cardItem: CartWithID[];
  itemId: string;
  itemCategory: string;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.getCart();
  }

  getCart() {
    let userlocal = localStorage.getItem('token');
    if(userlocal) {
      let User = JSON.parse(userlocal); 
      this.dataService.getCarts().subscribe( (res: CartWithID[]) => {
        console.log('get cart-', res)
        this.cardItem = res.filter( (res: CartWithID) => {
          return (res.userEmail === User.email);
        });
      })
    }
   
  }


  

}
