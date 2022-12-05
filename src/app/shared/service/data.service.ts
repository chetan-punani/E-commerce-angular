import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { map, Observable, Subject } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  firebaseURL = "https://bcommerce-c702b-default-rtdb.firebaseio.com/";
  getProductVal: Subject<any> = new Subject();
  productObj: Product;
  

  constructor(private http: HttpClient, private db: AngularFireDatabase) { }

  getProduct(): Observable<Product[]> {
    return this.http.get<Product[]>(this.firebaseURL + `product.json`)
      .pipe(map(product => {
        // const productArray: Array<Product> = [];
        // for (const key in product) {
        //   productArray.push(product[key]);
        // }
        return (this.converter(product));
      }));
  }

  getProductById(id: string, category: string): Observable<Product> {
    return this.http.get<Product>(this.firebaseURL + `/product/${category}/${id}.json`);
  }

  addProduct(product: Product): Observable<Product>  {
    return this.http.post<Product>(this.firebaseURL + `/product/${product.category}.json`, product);
  }

  
  putProduct(product: {id : string, category: string}): Observable<Product>  {
    return this.http.patch<Product>(this.firebaseURL + `/product/${product.category}/${product.id}/.json`, product);
  }

  updateProduct(product: Product, id : string): Observable<Product>  {
    return this.http.patch<Product>(this.firebaseURL + `/product/${product.category}/${id}/.json`, product);
  }

  deleteProduct(id: string, category: string): Observable<Product>  {
    return this.http.delete<Product>(this.firebaseURL + `/product/${category}/${id}.json`);
  }

  private converter( productObj: any ) {
    const products: Product[] = [];
    Object.keys( productObj ).forEach( key => {
      const product: Product = productObj[key];
      products.push( product );
    });
    return products;

  }
}
