import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Cart, CartResponse, CartWithID, Product, ProductWithId } from 'src/app/shared/models/product.model';
import { DataService } from 'src/app/shared/service/data.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  productList: ProductWithId[] = [];
  productListFiltered: ProductWithId[] = [];
  searchTxt: any; // { [key: string]: string }
  outOfStock: number;

  constructor(private route: ActivatedRoute, private dataService: DataService, private router: Router) { 
    this.loadData();
  }

  ngOnInit(): void {
    this.searchTxt = this.route.snapshot.queryParams['search']
  }

  loadData(): void {
    this.dataService.getProduct().subscribe( (product: ProductWithId[]) => {
      if (product) {
        let tempArray: ProductWithId[] = [];
        product.forEach((ele) => {
          tempArray = Object.values(ele);
          tempArray.forEach((ele) => {
            this.productList.push(ele);
          });
        });
        this.filterData();
      }
    })
  }

  filterData() {
    this.productListFiltered = this.productList.filter((value: Product) => {
      return ((value.name.toLowerCase().replace(/\s/g, '')).includes(this.searchTxt.toLowerCase().replace(/\s/g, '')))
    })
  }

  showProduct(id: string , category: string) {
    this.router.navigate(['product',category,id]);
  }

  addToCartProduct(id: string, category: string) {
    let userlocal = this.dataService.getLocalStorageUser();
    if (userlocal) {
      const email: string = userlocal.email;
      if (email) {
        const item: Cart = {
          productId: id,
          productCategory: category,
          userEmail: email,
        }
        this.dataService.addToCart(item).subscribe((res: CartResponse) => {

          const itemID = {
            id: res.name,
          }

          this.dataService.putCart(itemID).subscribe((res: CartWithID) => {
            this.router.navigate(['cart'])
          });
        })
      }
    } else {
      this.router.navigate(['login'])
    }

  }

}
