import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Cart, CartResponse, CartWithID, Product, ProductWithId } from 'src/app/shared/models/product.model';
import { AuthService } from 'src/app/shared/service/auth.service';
import { DataService } from 'src/app/shared/service/data.service';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.scss']
})
export class ProductViewComponent implements OnInit {

  category: string = '';
  id: string = '';
  product: ProductWithId;
  outOfStock: number;


  constructor(private route: ActivatedRoute, private dataService: DataService, private router: Router) { }

  ngOnInit() {
    this.category = this.route.snapshot.params['category'];
    this.id = this.route.snapshot.params['id'];
    this.fetchProductById();
  }

  fetchProductById() {
    this.dataService.getProductById(this.id, this.category).subscribe((res: ProductWithId) => {
      this.product = res;
      this.outOfStock = this.product.stock;
    });
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
    }  else {
      this.router.navigate(['login'])
    }
  }
}
