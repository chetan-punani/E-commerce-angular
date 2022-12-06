import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Product, ProductWithId } from 'src/app/shared/models/product.model';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  @Input() singleProduct: ProductWithId;
  product: ProductWithId[] = [];
 

  constructor() { }

  ngOnInit(): void {
    this.product.push(this.singleProduct)
  }

  

}
