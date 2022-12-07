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

  constructor(private route: ActivatedRoute, private dataService: DataService, private router: Router
    , private authService: AuthService) { }

  ngOnInit() {
    // console.log("queryparams:", this.route.snapshot.params['category'])
    // console.log("queryparams:", this.route.snapshot.params['id'])
    this.category = this.route.snapshot.params['category'];
    this.id = this.route.snapshot.params['id'];
    this.fetchProductById();
    // console.log('valu -',this.product)
  }

  fetchProductById() {
    this.dataService.getProductById(this.id, this.category).subscribe((res: ProductWithId) => {
      console.log(res)
      this.product = res;
    });
  }

  addToCartProduct(id: string, category: string) {
    let userlocal = localStorage.getItem('token');
    if (userlocal) {
      let User = JSON.parse(userlocal);
      // console.log(User.email)
      const email: string = User.email;
      if (email) {
        const item: Cart = {
          productId: id,
          productCategory: category,
          userEmail: email,
        }
        this.dataService.addToCart(item).subscribe((res: CartResponse) => {
          console.log(res)

          const itemID = {
            id: res.name,
          }

          this.dataService.putCart(itemID).subscribe((res: CartWithID) => {
            console.log("update cart", res)
            this.router.navigate(['cart'])
          });
        })
      }
    }  else {
      this.router.navigate(['login'])
    }

  }

}
