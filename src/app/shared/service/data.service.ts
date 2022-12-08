import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, Subject } from 'rxjs';
import { Cart, CartResponse, CartWithID, MyOrder, MyOrderResponse, MyOrderWithID, Product, ProductWithId } from '../models/product.model';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  firebaseURL = "https://bcommerce-c702b-default-rtdb.firebaseio.com/";
  getProductVal: Subject<any> = new Subject();
  productObj: ProductWithId;
  
  constructor(private http: HttpClient) { }

  getProduct(): Observable<ProductWithId[]> {
    return this.http.get<ProductWithId[]>(this.firebaseURL + `product.json`)
      .pipe(map(product => {
        return (this.converter(product));
      }));
  }

  getProductById(id: string, category: string): Observable<ProductWithId> {
    return this.http.get<ProductWithId>(this.firebaseURL + `/product/${category}/${id}.json`);
  }

  getProductByCategory(category: string): Observable<ProductWithId[]> {
    return this.http.get<ProductWithId[]>(this.firebaseURL + `/product/${category}.json`)
    .pipe(map(product => {
      return(this.converter(product))
    }));
  }

  addProduct(product: Product): Observable<Product>  {
    return this.http.post<Product>(this.firebaseURL + `/product/${product.category}.json`, product);
  }

  putProduct(product: {id : string, category: string}): Observable<ProductWithId>  {
    return this.http.patch<ProductWithId>(this.firebaseURL + `/product/${product.category}/${product.id}/.json`, product);
  }

  updateProduct(product: Product, id : string): Observable<ProductWithId>  {
    return this.http.patch<ProductWithId>(this.firebaseURL + `/product/${product.category}/${id}/.json`, product);
  }

  deleteProduct(id: string, category: string): Observable<ProductWithId>  {
    return this.http.delete<ProductWithId>(this.firebaseURL + `/product/${category}/${id}.json`);
  }


  getCarts(): Observable<CartWithID[]> {
    return this.http.get<CartWithID[]>(this.firebaseURL + `cart.json`)
      .pipe(map(cart => {
        return (this.converterCart(cart));
      }));
  }

  addToCart(item: Cart): Observable<CartResponse> {
    return this.http.post<CartResponse>(this.firebaseURL + `/cart.json`, item);
  }

  putCart(item: {id: string}): Observable<CartWithID>  {
    return this.http.patch<CartWithID>(this.firebaseURL + `/cart/${item.id}/.json`, item);
  }

  deleteCartById(id: string): Observable<CartWithID>  {
    return this.http.delete<CartWithID>(this.firebaseURL + `/cart/${id}.json`);
  }


  getMyOrders(): Observable<MyOrderWithID[]> {
    return this.http.get<MyOrderWithID[]>(this.firebaseURL + `myorder.json`)
      .pipe(map(myOrder => {
        return (this.converterMyOrder(myOrder));
      }));
  }

  addToMyOrder(item: MyOrder): Observable<MyOrderResponse> {
    return this.http.post<MyOrderResponse>(this.firebaseURL + `/myorder.json`, item);
  }

  putMyOrder(item: {id: string}): Observable<MyOrderWithID>  {
    return this.http.patch<MyOrderWithID>(this.firebaseURL + `/myorder/${item.id}/.json`, item);
  }

  getLocalStorageUser(): any {
    let user = localStorage.getItem('token');
    if (user) {
      let User = JSON.parse(user);
      return User;
    }    
  }

  private converter( productObj: any ) {
    const products: ProductWithId[] = [];
    Object.keys( productObj ).forEach( key => {
      const product: ProductWithId = productObj[key];
      products.push( product );
    });
    return products;

  }

  private converterCart( cartObj: any ) {
    const carts: CartWithID[] = [];
    if(cartObj = null)
    Object.keys( cartObj ).forEach( key => {
      const cart: CartWithID = cartObj[key];
      carts.push( cart );
    });
    return carts;

  }

  private converterMyOrder( myOrderObj: any ) {
    const myOrders: MyOrderWithID[] = [];
    Object.keys( myOrderObj ).forEach( key => {
      const myOrder: MyOrderWithID = myOrderObj[key];
      myOrders.push( myOrder );
    });
    return myOrders;

  }
}
