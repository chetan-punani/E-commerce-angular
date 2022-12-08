import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MyOrderWithID, ProductWithId } from 'src/app/shared/models/product.model';
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
    let userlocal = this.dataService.getLocalStorageUser();
    if(userlocal) {
      this.logedInUserEmail = userlocal.email;

      this.dataService.getMyOrders().subscribe( (res: MyOrderWithID[]) => {
        
        this.myOrdersItem = res.filter( (res: MyOrderWithID) => {
          return (res.userEmail === userlocal.email);
        });

        this.myOrdersItem.forEach( (item: MyOrderWithID) => {
          if(item.order) {
            item.order.forEach( (order) => {
              this.dataService.getProductById(order.productId, order.productCategory).subscribe( (res: ProductWithId) => {
                this.showOrderItem.push(res);
              })
            })
          }
         
        })
      })
    }
  }
}
