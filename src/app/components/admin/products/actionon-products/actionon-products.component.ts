import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from 'src/app/shared/models/product.model';
import { DataService } from 'src/app/shared/service/data.service';

@Component({
  selector: 'app-actionon-products',
  templateUrl: './actionon-products.component.html',
  styleUrls: ['./actionon-products.component.scss']
})
export class ActiononProductsComponent implements OnInit {
  
  addProductForm!: FormGroup;

  constructor(private dataService: DataService, private router: Router) { }

  ngOnInit(): void {
    this.initaddProductForm();
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

  addProduct() {
    const newProduct: Product = {
      name: this.addProductForm.value.name,
      description: this.addProductForm.value.description,
      price: this.addProductForm.value.price,
      stock: this.addProductForm.value.stock,
      category: this.addProductForm.value.category,
      id: Math.floor((Math.random() * 1000) + 1)
    }
    this.dataService.addProduct(newProduct).subscribe(response => {
      console.log("add product", response)
      window.location.reload()
    });
    this.addProductForm.reset();
  }

}
