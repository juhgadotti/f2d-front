import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Food2DeskApi } from '../../../environments/path';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../../header/header.component';
import { Product } from '../../interfaces/product';
import { ProductRegisterComponent } from '../../components/product-register/product-register.component';
//teste

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
  searchTerm: string = '';
  filteredProducts: any[] = [];

  ngOnInit(): void{
    this.http.get<Product[]>(this.urls.product.root).subscribe(response => {
      this.products = response;
      this.filteredProducts = this.products;
    });  
  }

  filterStatus: string = '';
minPrice: number | null = null;
maxPrice: number | null = null;

applyFilters(): void {
  this.filteredProducts = this.products.filter(product => {
    const matchesName = product.name.toLowerCase().includes(this.searchTerm.toLowerCase());
    const matchesStatus = this.filterStatus === '' || product.status.toString() === this.filterStatus;
    const matchesMinPrice = this.minPrice == null || product.price >= this.minPrice;
    const matchesMaxPrice = this.maxPrice == null || product.price <= this.maxPrice;

    return matchesName && matchesStatus && matchesMinPrice && matchesMaxPrice;
  });
}
}

