import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/shared/models/product.model';
import { DataService } from 'src/app/shared/service/data.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  productList: any = [];

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getProduct().subscribe((product: Product[]) => {
      if (product) {
        console.log(product)
        this.productList = product;
      }
    })
  }

}
