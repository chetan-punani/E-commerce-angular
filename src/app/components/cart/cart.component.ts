import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartWithID, MyOrder, MyOrderResponse, MyOrderWithID, ProductWithId } from 'src/app/shared/models/product.model';
import { DataService } from 'src/app/shared/service/data.service';

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
  total: number = 0;

  constructor(private dataService: DataService, private router: Router) { 
    this.getCart();
  }

  ngOnInit(): void {
   
  }

  getCart() {
    this.cardItem = [];
    let userlocal = this.dataService.getLocalStorageUser();
    if(userlocal) {
      this.logedInUserEmail = userlocal.email;
      this.dataService.getCarts().subscribe( (res: CartWithID[]) => {
        if(res.length > 0) {
          this.cardItem = res.filter( (res: CartWithID) => {
            return (res.userEmail === userlocal.email);
          });
          this.getGrandTotal();
        } 
      })
    }
  }

  getGrandTotal() {
    this.total = 0;
    this.cardItem.forEach( (cartItem: CartWithID) => {
      this.dataService.getProductById(cartItem.productId, cartItem.productCategory).subscribe( (product: ProductWithId) => {
        this.total = this.total + product.price;
      })
    })
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
      
      const orderID = {
        id: res.name
      }

      this.dataService.putMyOrder(orderID).subscribe((res: MyOrderWithID) => {

        this.cardItem.forEach( (item: CartWithID) => {

          this.dataService.deleteCartById(item.id).subscribe( (res: CartWithID) => {

            this.dataService.getProductById(item.productId, item.productCategory).subscribe( (product: ProductWithId) => {
              let updateStock: number = product.stock;
  
              if(updateStock > 0) {
                updateStock = updateStock - 1;
              } else if (updateStock === 0) {
                updateStock = updateStock;
              }
              
              const tempProduct : ProductWithId = {
                name: product.name,
                description: product.description,
                price: product.price,
                stock: updateStock,
                category: product.category,
                id: product.id
              }
   
              this.dataService.updateProduct(tempProduct, product.id).subscribe( (stockUpdateRes: ProductWithId) => {

                this.router.navigate(['my-orders'])
              })
            })
          })
        })
      });
    })
  }

}
