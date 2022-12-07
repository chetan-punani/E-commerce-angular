import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartWithID, MyOrderWithID, ProductWithId } from 'src/app/shared/models/product.model';
import { DataService } from 'src/app/shared/service/data.service';

@Component({
  selector: 'app-myorder',
  templateUrl: './myorder.component.html',
  styleUrls: ['./myorder.component.scss']
})
export class MyorderComponent implements OnInit {

  myOrdersItem: MyOrderWithID[];
  logedInUserEmail: string;
  showOrderItem: ProductWithId[] = [];

  constructor(private dataService: DataService, private router: Router) { }

  ngOnInit(): void {
    this.getMyOrders();
  }

  getMyOrders(): void {
    this.myOrdersItem = [];
    let userlocal = localStorage.getItem('token');
    if(userlocal) {
      let User = JSON.parse(userlocal); 
      this.logedInUserEmail = User.email;

      this.dataService.getMyOrders().subscribe( (res: MyOrderWithID[]) => {
        console.log('get orders-', res)
        
        this.myOrdersItem = res.filter( (res: MyOrderWithID) => {
          return (res.userEmail === User.email);
        });

        this.myOrdersItem.forEach( (item: MyOrderWithID) => {
          if(item.order) {
            item.order.forEach( (order) => {
              this.dataService.getProductById(order.productId, order.productCategory).subscribe( (res: ProductWithId) => {
                console.log(res)
                this.showOrderItem.push(res);
              })
            })
          }
         
        })

        
        console.log(this.myOrdersItem)
      })

    }
  }

}
