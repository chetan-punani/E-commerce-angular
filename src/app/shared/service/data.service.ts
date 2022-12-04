import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  firebaseURL = "https://bcommerce-c702b-default-rtdb.firebaseio.com/"

  constructor(private http: HttpClient) { }

  getProduct(): Observable<Product[]> {
    return this.http.get<Product[]>(this.firebaseURL + 'product.json')
      .pipe(map(product => {
        const productArray: Array<Product> = [];
        for (const key in product) {
          productArray.push(product[key]);
        }
        return productArray;
      }));
  }

  addProduct(product: Product) {
    return this.http.post<any>(this.firebaseURL + '/product/ ' + product.category + '.json', product);
  }

  deleteProduct(id: number) {
    return this.http.delete<any>(this.firebaseURL + '/product/ ' + id + '.json');
  }
}
