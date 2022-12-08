import { Component, OnInit } from '@angular/core';
import { CartWithID, MyOrderWithID, ProductWithId } from 'src/app/shared/models/product.model';
import { DataService } from 'src/app/shared/service/data.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  myOrdersItem: any;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.myOrdersItem = [];
    let userlocal = localStorage.getItem('token');
    if (userlocal) {

      this.dataService.getMyOrders().subscribe((res: MyOrderWithID[]) => {
        res.forEach((resVal: MyOrderWithID) => {
          resVal.order.forEach((orderVal: CartWithID) => {
            this.dataService.getProductById(orderVal.productId, orderVal.productCategory).subscribe((productVal: ProductWithId) => {
              this.myOrdersItem.push({
                name: productVal.name,
                price: productVal.price,
                id: resVal.id,
              })
            })
          })
        })
      })
    }
  }

}
