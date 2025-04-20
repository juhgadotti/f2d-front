// src/app/services/product.service.ts
import { Injectable } from '@angular/core';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products: Product[] = [
    {
      id: "1",
      name: 'Sample Product',
      description: 'This is a sample product description',
      price: 99.99,
      image: 'https://via.placeholder.com/150',
      category: 'Electronics',
      status: 1
    }
  ];

  getProducts(): Product[] {
    return this.products;
  }

  addProduct(product: Product): void {
    this.products.push(product);
  }

  updateProduct(updatedProduct: Product): void {
    const index = this.products.findIndex(p => p.id === updatedProduct.id);
    if (index !== -1) {
      this.products[index] = updatedProduct;
    }
  }

  deleteProduct(id: string): void {
    this.products = this.products.filter(p => p.id !== id);
  }

  toggleProductStatus(id: string): void {
    const product = this.products.find(p => p.id === id);
    if (product) {
      product.status = product.status === 1 ? 'Disabled' : 'Active';
    }
  }
}