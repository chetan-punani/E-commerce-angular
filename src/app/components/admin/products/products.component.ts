import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/shared/service/data.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  productList: Array<any> = [];

  hide: boolean = false;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.dataService.getProduct().subscribe(product => {
      if (product) {
        let tempArray: Array<any> = [];
        product.forEach( (ele) => {
          tempArray = Object.values(ele);
          tempArray.forEach( (ele) => {
            this.productList.push(ele);
          });
        }); 
      }
    })
  }
 
  showAddProduct(): void {
    this.hide = !this.hide;
  }

  deleteProduct(id: number) {
    console.log(id)
  }

}
