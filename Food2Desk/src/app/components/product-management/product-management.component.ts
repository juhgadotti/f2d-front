import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Food2DeskApi } from '../../../environments/path';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../../header/header.component';
import { Product } from '../../interfaces/product';
import { ProductRegisterComponent } from '../../components/product-register/product-register.component';


@Component({
  selector: 'app-product-management',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FormsModule, ProductRegisterComponent],
  templateUrl: './product-management.component.html',
  styleUrl: './product-management.component.scss'
})
export class ProductManagementComponent implements OnInit {
constructor(private router: Router, private http: HttpClient) {}
  
  private urls = Food2DeskApi.urls;
  products: Product[] = [];

  ngOnInit(): void{
    this.http.get<Product[]>(this.urls.product.root).subscribe(response => {
      this.products = response;
    });  
  }
}
