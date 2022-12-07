import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartWithID, MyOrder, MyOrderResponse, MyOrderWithID } from 'src/app/shared/models/product.model';
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
  logedInUserEmail: string;

  constructor(private dataService: DataService, private router: Router) { }

  ngOnInit(): void {
    this.getCart();
  }

  getCart() {
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
        } 
      })
    }
  }

  refreshCart(value: boolean) {
    if(value === true) {
      this.getCart();
    }
  }

  placeOrder() {
    const myOrder: MyOrder = {
      order: this.cardItem,
      userEmail: this.logedInUserEmail
    }
    this.dataService.addToMyOrder(myOrder).subscribe( (res: MyOrderResponse) => {
      console.log(res)
      
      const orderID = {
        id: res.name
      }

      this.dataService.putMyOrder(orderID).subscribe((res: MyOrderWithID) => {
        console.log("update cart", res)

        this.cardItem.forEach( (res: CartWithID) => {
          console.log(res.id)
          this.dataService.deleteCartById(res.id).subscribe( (res: CartWithID) => {
            console.log(res);
          })
        })
        this.router.navigate(['my-orders'])
      });
    })
  }

}
