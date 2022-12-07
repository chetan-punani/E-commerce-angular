import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
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


  constructor(private router: Router) { }

  ngOnInit(): void {

    for(const key in this.categoryWiseProduct){
      this.categoryName = this.categoryWiseProduct[key].category
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

  showProductOfCategory(category: string): void {
    console.log(category)
    this.router.navigate(['product',category])
  }

}
