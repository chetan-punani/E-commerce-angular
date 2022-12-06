import { Component, OnInit } from '@angular/core';
import { take  } from 'rxjs';
import { Product, ProductWithId } from 'src/app/shared/models/product.model';
import { DataService } from 'src/app/shared/service/data.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  productList: ProductWithId[] = [];
  id: string;
  category: string;
  hide: boolean = false;
  reset: boolean = false;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.dataService.getProduct().subscribe( (product: ProductWithId[]) => {
      if (product) {
        this.productList = [];
        let tempArray: ProductWithId[] = [];
        product.forEach((ele) => {
          tempArray = Object.values(ele);
          tempArray.forEach((ele) => {
            this.productList.push(ele);

          });
        });
      }
    })
  }

  showAddProduct(): void {
    this.hide = !this.hide;
    this.id = '';
    this.category = '';
  }

  viewProduct(id: any, category: string) {
    this.id = id;
    this.category = category
    this.hide = !this.hide;
    this.loadData();
  }

  deleteProduct(id: any, category: string) {
    this.dataService.deleteProduct(id, category).subscribe((res: ProductWithId) => {
      console.log('delete :', res)
      this.loadData();
    });
    
  }

}
