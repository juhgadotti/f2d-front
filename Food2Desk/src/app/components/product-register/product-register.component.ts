import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Product } from '../../interfaces/product';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Food2DeskApi } from '../../../environments/path';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-product-register',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './product-register.component.html',
  styleUrl: './product-register.component.scss'
})

export class ProductRegisterComponent implements OnInit {
  
  constructor(private router: Router, private http: HttpClient) {}
  
  product: Product = {} as Product;  
  name!: string;
  description!: string;
  category: string = '';
  categoryString: string = '';
  price!: number;
  categories: string[] = [];
  categorySelect: boolean = true;
  alreadyExist: boolean = false;


  currentView: 'list' | 'new' | 'edit' = 'new';



  private urls = Food2DeskApi.urls;
  
  ngOnInit() { 
    this.http.get<string[]>(this.urls.product.categories).subscribe(response => {
      this.categories = response;
    });  
  }

  addCategory(){
    this.categorySelect = !this.categorySelect;
  }

  saveProduct() {
    this.product.name = this.name;
    this.product.price = this.price;
    this.product.description = this.description;
    this.product.category = this.categorySelect ? this.category : this.categoryString;

    console.log(this.product)

    this.http.post<Product>(this.urls.product.root, this.product).subscribe(response => {
          if(!response.name){
            this.alreadyExist = true;            
          }
        });
    
  }

  replaceProduct(){
    this.http.put<Product>(this.urls.product.root, this.product).subscribe(response => {
      console.log(response)
    });
  }
}
