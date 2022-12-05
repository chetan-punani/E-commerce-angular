import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from 'src/app/shared/models/product.model';
import { DataService } from 'src/app/shared/service/data.service';

@Component({
  selector: 'app-actionon-products',
  templateUrl: './actionon-products.component.html',
  styleUrls: ['./actionon-products.component.scss']
})
export class ActiononProductsComponent implements OnInit, OnDestroy {
  
  addProductForm!: FormGroup;
  @Input() productID:  string;
  @Input() productCategory:  string;
  isShow: boolean = false;

  constructor(private dataService: DataService, private router: Router) { }

  ngOnInit(): void {
    this.initaddProductForm();
    console.log('from child: ',this.productID, this.productCategory)
    if(this.productID && this.productCategory) {
      this.fillProductDetails();
      this.isShow = !this.isShow;
    }
   
  }

  initaddProductForm(){
    this.addProductForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      price: new FormControl(null, Validators.required),
      stock: new FormControl(null, Validators.required),
      category: new FormControl(null, Validators.required),
    })
  }

  fillProductDetails() {
    this.dataService.getProductById(this.productID, this.productCategory).subscribe((res: Product) => {
      console.log('res data:',res);
      this.addProductForm = new FormGroup({
        name: new FormControl(res.name),
        description: new FormControl(res.description),
        price: new FormControl(res.price),
        stock: new FormControl(res.stock),
        category: new FormControl(res.category),
      })
    });
  }

  addProduct() {
    const newProduct: Product = {
      name: this.addProductForm.value.name,
      description: this.addProductForm.value.description,
      price: this.addProductForm.value.price,
      stock: this.addProductForm.value.stock,
      category: this.addProductForm.value.category,
    }

    if(!this.isShow) {
      
      this.dataService.addProduct(newProduct).subscribe((res: Product) => {
        console.log("add product", res)

        const addID = {
          id: res.name,
          category: newProduct.category
        }

        this.dataService.putProduct(addID).subscribe( (res: Product) => {
          console.log("update product", res)
        });
      });
    } else {
      this.dataService.updateProduct(newProduct,this.productID).subscribe((res: Product) => {
        console.log("add product", res)
      });
    }
    this.addProductForm.reset();
  }

  ngOnDestroy(): void {
    this.productID = '';
    this.productCategory = '';
  }

}
