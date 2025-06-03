import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HeaderComponent } from '../../header/header.component';
import { FormsModule } from '@angular/forms';
import { Order } from './order';
import { User } from '../../interfaces/user';
import { Product } from '../../interfaces/product';
import { HttpClient } from '@angular/common/http';
import { Food2DeskApi } from '../../../environments/path';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-home',
  imports: [CommonModule, HeaderComponent, FormsModule],
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.scss'],
  standalone: true
})

export class UserHomeComponent implements OnInit {
  constructor(private router: Router, private http: HttpClient) { }

  private urls = Food2DeskApi.urls;

  productsList: Product[] = [];
  order: Partial<Order> = { cart: [] };
  user: User = {} as User; //q isso aqui meu deus
  totalString: string | undefined = '';
  searchTerm: string = '';
  selectedCategory: string = '';      // lista filtrada que será exibida
  allProducts: Product[] = [];        // lista original recebida do backend
  categories: string[] = [];          // categorias únicas
  time: number = 12;

  ngOnInit(): void {
    this.http.get<Product[]>(this.urls.product.root).subscribe(response => {
      const filtered = response.filter(a => a.status == 1);
      this.allProducts = filtered;
      this.productsList = [...this.allProducts]; // inicializa com todos
      this.categories = [...new Set(filtered.map(p => p.category))];
    });

    const userId = localStorage.getItem('userId');
    this.http.get<User>(`${this.urls.user.root}/${userId}`).subscribe(response => {
      this.user = response;
    });
  }


  reserveDish() { this.router.navigate(['/order-lunch']) }

filterProducts() {
  this.productsList = this.allProducts.filter(product => {
    const matchesCategory = this.selectedCategory === '' || product.category === this.selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(this.searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });
}




  orderItens: boolean = true;
  orderSent: boolean = false;

  currentView: 'items' | 'details' | 'review' | 'confirmation' = 'items';

  selectedOffice!: User['offices'][0] | null;

  addToCart(product: any) {
    console.log(product);
    const item = this.order.cart?.find(cartItem => cartItem.id === product.id);
    if (!item) {
      this.order.cart?.push({ ...product, quantity: 1 });
    }
    else {
      item.quantity++;
    }
    this.calculateTotalPrice();
  }

  removeFromCart(product: any) {
    if (product.quantity > 1)
      product.quantity--;
    else {
      this.order.cart = this.order.cart?.filter(cartItem => cartItem.id !== product.id);
    }
    this.calculateTotalPrice();
  }

  calculateTotalPrice(): void {
    this.order.totalCharge = this.order.cart?.reduce((sum, item) => sum + item.price * item.quantity, 0);
    this.totalString = this.order.totalCharge?.toFixed(2).replace('.', ',');
  }

  sendOrder() {
    console.log(this.order);

    this.order.userId = localStorage.getItem('userId') ?? undefined;
    this.order.toDelivery = true;
    this.http.post<Order>(this.urls.order.root, this.order).subscribe(response => {
      console.log(response);
    });
    this.time += (this.order.cart?.length ?? 1 * 2);
    this.orderNavigate(3);
    //this.http.post<Order>(this.urls.order.root, this.order).subscribe(response => {
    //  console.log(response);
    //});
  }

  newOrder(): void {
    this.order = {};
    this.order.cart = [];
    this.selectedOffice = null;

    this.totalString = '';
    this.orderNavigate(4);

    this.http.get<Product[]>(this.urls.product.root).subscribe(response => {
      const filtered = response.filter(a => a.status == 1);
      this.allProducts = filtered;
      this.productsList = [...this.allProducts]; // inicializa com todos
      this.categories = [...new Set(filtered.map(p => p.category))];
    });
  }

  goToOrderStatus() {
    this.router.navigate(['/user-order-status']);
  }

  onOfficeSelect() {
    this.order.office = this.selectedOffice;
  }

  reviewOrder() {
    this.orderNavigate(2);
  }

  orderNavigate(view: number) {
    switch (view) {
      case 1:
        this.currentView = 'details';
        break;
      case 2:
        this.currentView = 'review';
        break;
      case 3:
        this.currentView = 'confirmation';
        break;
      case 4:
      default:
        this.currentView = 'items';
        break;
    }
  }
}