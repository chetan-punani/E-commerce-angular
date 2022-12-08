import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cart, CartResponse, CartWithID,  ProductWithId } from 'src/app/shared/models/product.model';
import { DataService } from 'src/app/shared/service/data.service';

@Component({
  selector: 'app-showproduct',
  templateUrl: './showproduct.component.html',
  styleUrls: ['./showproduct.component.scss']
})
export class ShowproductComponent implements OnInit {

  productCategory: string;
  showProduct: ProductWithId[];

  constructor(private dataService: DataService, private route: ActivatedRoute
    , private router: Router) { }

  ngOnInit(): void {
    this.productCategory = this.route.snapshot.params['category'];
    this.getProducts();
  }

  getProducts(): void {
    this.dataService.getProductByCategory(this.productCategory).subscribe( (res: ProductWithId[]) => {
      this.showProduct = res;
    })
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
