import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CartWithID, ProductWithId } from 'src/app/shared/models/product.model';
import { DataService } from 'src/app/shared/service/data.service';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss']
})
export class ItemListComponent implements OnInit {
  
  @Input() cartItemVal: CartWithID;
  @Output() refreshCartEvent = new EventEmitter<boolean>();
  productItem: ProductWithId;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.getCartItem();
  }

  getCartItem(): void {
    this.dataService.getProductById(this.cartItemVal.productId, this.cartItemVal.productCategory).subscribe( (res: ProductWithId) => {
      this.productItem = res;
    })
  }

  deleteItem(id: string): void {
    this.dataService.deleteCartById(id).subscribe( (res: CartWithID) => {
      this.refreshCartEvent.emit(true);
    })
  }

}
