import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Product } from '../../interfaces/product';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Food2DeskApi } from '../../../environments/path';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-product-management',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './product-management.component.html',
  styleUrl: './product-management.component.scss'
})

export class ProductManagementComponent implements OnInit {
  constructor(private router: Router, private http: HttpClient) {}

  name!: string;
  description!: string;
  category: string = '';
  price!: number;
  categories: string[] = [];

  product: Product = {} as Product;

  private urls = Food2DeskApi.urls;

 // options = 
  
  ngOnInit(){   
    this.categories = ['Bebida', 'Salgado', 'Doce', 'Almoço']
  }


  saveProduct(){
    this.product.name = this.name;
    this.product.price = this.price;
    this.product.description = this.description;    

    console.log(this.product)

    this.http.post<Product>(this.urls.product.root, this.product).subscribe(response => {
          console.log(response);
        });

    this.http.get<Product[]>(this.urls.product.categories).subscribe(response => {
          console.log(response);
    });
  }

  conso(){
    console.log(this.categories)
  }
}
