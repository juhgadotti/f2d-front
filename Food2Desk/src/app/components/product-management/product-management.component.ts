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
import { ViewChild, ElementRef } from '@angular/core';
import { supabase } from '../../supabase.client';


declare var bootstrap: any;


@Component({
  selector: 'app-product-management',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FormsModule, ProductRegisterComponent, ProductLunchComponent],
  templateUrl: './product-management.component.html',
  styleUrl: './product-management.component.scss',
})

export class ProductManagementComponent implements OnInit {
  constructor(private router: Router, private http: HttpClient) { }
  @ViewChild('confirmDeleteModal') confirmDeleteModal!: ElementRef;
  @ViewChild('editProductModal') editProductModal!: ElementRef;

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
  productIdToDelete: string | null = null;
  product: Product = {} as Product;
  imageUrl: string = '';

  ngOnInit(): void {
    this.list();
    this.http.get<string[]>(this.urls.product.categories).subscribe(response => {
      this.categories = response;
    });
  }

  updateList() {
    this.list();
    this.http.get<string[]>(this.urls.product.categories).subscribe(response => {
      this.categories = response;
    });
  }

  list() {
    this.http.get<Product[]>(this.urls.product.root).subscribe(response => {
      this.products = response;
      this.filteredProducts = this.products;
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

  changeProductStatus(id: string) {
    this.http.put(`${this.urls.product.status}/${id}`, null).subscribe(response => {
      this.list();
    });
  }

  delete(id: string) {
    this.http.delete(`${this.urls.product.root}/${id}`).subscribe(response => {
      this.list();
    });
  }

  prepareDelete(id: string) {
    this.productIdToDelete = id;
  }

  confirmDelete() {
    if (this.productIdToDelete) {
      this.delete(this.productIdToDelete);
      this.productIdToDelete = null;

      // Fecha o modal
      const modalEl = this.confirmDeleteModal.nativeElement;
      const modalInstance = bootstrap.Modal.getInstance(modalEl);
      modalInstance?.hide();
    }
  }

  openEditModal(product: Product) {
    this.product = { ...product }; // clona para evitar modificar direto
    const modalEl = this.editProductModal.nativeElement;
    const modal = new bootstrap.Modal(modalEl);
    modal.show();
  }

  updateProduct() {
    this.product.imageUrl = this.imageUrl;
    this.http.put<Product>(this.urls.product.root, this.product).subscribe(response => {
      this.list();
      const modalEl = this.editProductModal.nativeElement;
      const modalInstance = bootstrap.Modal.getInstance(modalEl);
      modalInstance.hide();
    });
  }

  async uploadSupabase(event: any) {
      const file: File = event.target.files[0];
      const filePath = `${file.name}`;    
      let {data, error} = await supabase.storage.from('product').upload(filePath, file);
      console.log(data)
      if(data){
        this.imageUrl = 'https://dztnpppziryhmoohygjk.supabase.co/storage/v1/object/public/' + data.fullPath;
      }
    }

}

