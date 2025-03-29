import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Product } from '../../interfaces/product';

@Component({
  selector: 'app-product-management',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './product-management.component.html',
  styleUrl: './product-management.component.scss'
})

export class ProductManagementComponent {
  name!: string | null;
  description!: string | null;
  category: string = '';
  price!: number | null;


  product: Product = {} as Product;

  saveProduct(product: any){
    product.name = this.name;
    product.price = this.price;

    console.log(product)
  }
}
