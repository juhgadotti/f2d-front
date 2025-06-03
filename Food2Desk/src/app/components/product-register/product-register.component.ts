import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Product } from '../../interfaces/product';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Food2DeskApi } from '../../../environments/path';
import { CommonModule } from '@angular/common';
import { supabase } from '../../supabase.client';


@Component({
  selector: 'app-product-register',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './product-register.component.html',
  styleUrl: './product-register.component.scss'
})

export class ProductRegisterComponent implements OnInit {

  constructor(private router: Router, private http: HttpClient) { }

  product: Product = {} as Product;
  name!: string;
  description!: string;
  category: string = '';
  categoryString: string = '';
  price!: number;
  categories: string[] = [];
  categorySelect: boolean = true;
  alreadyExist: boolean = false;
  imageUrl: string = '';
  sucess: boolean = false;

  currentView: 'list' | 'new' | 'edit' = 'new';



  private urls = Food2DeskApi.urls;

  ngOnInit() {
    this.http.get<string[]>(this.urls.product.categories).subscribe(response => {
      this.categories = response;
    });
  }

  addCategory() {
    this.categorySelect = !this.categorySelect;
  }

  saveProduct() {
    this.product.name = this.name;
    this.product.price = this.price;
    this.product.description = this.description;
    this.product.category = this.categorySelect ? this.category : this.categoryString;
    this.product.imageUrl = this.imageUrl;
    console.log(this.product)

    this.http.post<Product>(this.urls.product.root, this.product).subscribe(response => {
          if(!response.name) {
        this.alreadyExist = true;
        this.sucess = false;
      } else {
        this.sucess = true;
        this.alreadyExist = false;

        this.name = ''

      }
    });
  }

  replaceProduct() {
    this.product.status = 1;
    this.http.put<Product>(this.urls.product.root, this.product).subscribe(response => {
      console.log(response)
      this.alreadyExist = false;
      this.sucess = true;
    });
  }

  clean(){
    this.name = '';
    this.price = 0;
    this.categoryString = '';
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
