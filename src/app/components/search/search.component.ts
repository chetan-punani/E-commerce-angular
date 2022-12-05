import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/shared/models/product.model';
import { DataService } from 'src/app/shared/service/data.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  productList: Product[] = [];
  searchTxt: any;

  constructor(private route: ActivatedRoute, private dataService: DataService) { }

  ngOnInit(): void {
    console.log(this.route.snapshot.queryParams)
    this.searchTxt = this.route.snapshot.queryParams
    this.loadData();
    if(this.searchTxt) {
      this.filterData()
    }
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

  filterData() {
    
  }

}
