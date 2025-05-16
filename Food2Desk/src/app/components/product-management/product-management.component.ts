import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Food2DeskApi } from '../../../environments/path';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../../header/header.component';
import { Product } from '../../interfaces/product';
import { ProductRegisterComponent } from '../../components/product-register/product-register.component';
import { ProductLunchComponent } from '../product-lunch/product-lunch.component';
//teste

@Component({
  selector: 'app-product-management',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FormsModule, ProductRegisterComponent, ProductLunchComponent],
  templateUrl: './product-management.component.html',
  styleUrl: './product-management.component.scss'
})
export class ProductManagementComponent implements OnInit {
constructor(private router: Router, private http: HttpClient) {}
  
  private urls = Food2DeskApi.urls;
  products: Product[] = [];
  searchTerm: string = '';
  filteredProducts: any[] = [];
  filterStatus: string = '';
  minPrice: number | null = null;
  maxPrice: number | null = null;
  categories: string[] = [];
  filterCategory: string = '';
  filterShow: boolean = false;

  ngOnInit(): void{
    this.http.get<Product[]>(this.urls.product.root).subscribe(response => {
      this.products = response;
      this.filteredProducts = this.products;
    });  

    this.http.get<string[]>(this.urls.product.categories).subscribe(response => {
      this.categories = response;
    });  
  }

applyFilters(): void {
  this.filteredProducts = this.products.filter(product => {
    const matchesName = product.name.toLowerCase().includes(this.searchTerm.toLowerCase());
    const matchesStatus = this.filterStatus === '' || product.status.toString() === this.filterStatus;
    const matchesMinPrice = this.minPrice == null || product.price >= this.minPrice;
    const matchesMaxPrice = this.maxPrice == null || product.price <= this.maxPrice;
    const matchesCategory = this.filterCategory === '' || product.category === this.filterCategory;

    return matchesName && matchesStatus && matchesMinPrice && matchesMaxPrice && matchesCategory;
  });
}
cleanFilters(): void {
  this.searchTerm = '';
  this.filterStatus = '';
  this.minPrice = null;
  this.maxPrice = null;
  this.filterCategory = '';
  this.filteredProducts = this.products;
  this.applyFilters();
}
}

