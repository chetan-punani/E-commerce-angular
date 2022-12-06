import { Component, Input, OnInit } from '@angular/core';
import { CartWithID, Product } from 'src/app/shared/models/product.model';
import { DataService } from 'src/app/shared/service/data.service';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss']
})
export class ItemListComponent implements OnInit {
  
  @Input() cartItemVal: CartWithID;
  productItem: Product;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    console.log(this.cartItemVal)
    this.getCartItem();
  }

  getCartItem() {
    this.dataService.getProductById(this.cartItemVal.productId, this.cartItemVal.productCategory).subscribe( (res: Product) => {
      this.productItem = res;
    })
  }

}
