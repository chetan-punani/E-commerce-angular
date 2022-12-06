import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Product } from 'src/app/shared/models/product.model';
import { DataService } from 'src/app/shared/service/data.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  productList: Product[] = [];
  productListFiltered: Product[] = [];
  searchTxt: any; // { [key: string]: string }

  constructor(private route: ActivatedRoute, private dataService: DataService, private router: Router) { 
    this.loadData();
  }

  ngOnInit(): void {
    this.searchTxt = this.route.snapshot.queryParams['search']
    console.log(this.route.snapshot.queryParams['search'])
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
      this.filterData();
    })
  }

  filterData() {
    this.productListFiltered = this.productList.filter((value: Product) => {
      return ( (value.name.toLowerCase()).includes(this.searchTxt.toLowerCase()))
    })
    console.log(this.productListFiltered)
  }

  showProduct(id: string) {
    this.router.navigate(['product',id]);
  }

}
