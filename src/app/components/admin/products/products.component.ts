import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Product } from 'src/app/shared/models/product.model';
import { DataService } from 'src/app/shared/service/data.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  productList: Product[] = [];
  id: string;
  category: string;

  hide: boolean = false;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.dataService.getProduct().subscribe( (product: Product[]) => {
      if (product) {
        let tempArray: Product[] = [];
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
    
  }

  viewProduct(id: any, category: string) {
    this.id = id;
    this.category = category
    this.showAddProduct();
    this.loadData();
  }

  deleteProduct(id: any, category: string) {
    this.dataService.deleteProduct(id, category).subscribe((res: Product) => {
      console.log('delete :', res)
    });
    this.loadData();
  }

}
