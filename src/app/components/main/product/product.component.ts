import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Product, ProductWithId } from 'src/app/shared/models/product.model';
import { DataService } from 'src/app/shared/service/data.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  @Input('categoryWiseProduct') categoryWiseProduct:  ProductWithId[] = []
  productListArray: ProductWithId[] = [];
  @ViewChild('scroller') scroller: ElementRef<any>;
  categoryName: string = '';


  constructor() { }

  ngOnInit(): void {
    for(const key in this.categoryWiseProduct){
      this.productListArray.push(this.categoryWiseProduct[key]);
    }
  }

  onWheel(event: WheelEvent): void {
    if (event.deltaY > 0) this.scrollToRight();
    else this.scrollToLeft();
  }

  scrollToLeft(): void {
    this.scroller.nativeElement.scrollLeft -= 400;
  }

  scrollToRight(): void {
    this.scroller.nativeElement!.scrollLeft += 400;
  }

}
