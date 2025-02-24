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

interface Delivery {
  now: boolean,
  time: string
}

interface Details {
  delivery: {
    now: boolean,
    time: string
  },
  officeAddress: number | null
}

@Component({
  selector: 'app-user-home',
  imports: [CommonModule, HeaderComponent, FormsModule],
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.scss'],
  standalone: true
})
   
export class UserHomeComponent implements OnInit {
  constructor(private router: Router, private http: HttpClient) {}
  
  private urls = Food2DeskApi.urls;

  productsList: Product[] = [];
  order: Partial<Order> = { cart: [] };
  user: User = {} as User; //q isso aqui meu deus
  totalString: string | undefined = '';

  ngOnInit(): void { //load

    this.http.get<Product[]>(this.urls.product.root).subscribe(response => {
      this.productsList = response;
    });
    
    this.http.get<User>(this.urls.user.root).subscribe(response =>{
      this.user = response;
    });

  }

  details: Details = {
    delivery: { now: true, time: ''},
    officeAddress: null
  }
  
  orderItens: boolean =  true;
  orderSent: boolean = false;
  //orderDetails: boolean = false;
  
  currentView: 'items' | 'details' | 'review'| 'confirmation'  = 'items';

  selectedOffice: number | null = null;

  addToCart(product: any) {
    console.log(product);
    const item = this.order.cart?.find(cartItem => cartItem.id === product.id);
    if(!item) {
        this.order.cart?.push({...product, quantity: 1});
    }
    else {
       item.quantity++;
    }
    this.calculateTotalPrice();    
  }

  removeFromCart(product: any){
    if(product.quantity > 1)
      product.quantity--;
    else  {
      this.order.cart = this.order.cart?.filter(cartItem => cartItem.id !== product.id);
    }
    this.calculateTotalPrice();
  }

  calculateTotalPrice(): void{
    this.order.totalCharge = this.order.cart?.reduce((sum, item) => sum + item.price * item.quantity, 0);
    this.totalString = this.order.totalCharge?.toFixed(2).replace('.', ',');
  }

  sendOrder(): void { //vai retornar o recebimento do pedido
    console.log(this.order)
    this.order.office?.floor.at;
    //this.http.put<order>().subscribe(response => {
    //  console.log(response)
    //});        
    this.orderNavigate(2);
  }

  newOrder(): void {
    this.order = {};
    this.order.cart = [];

    this.details = {
      delivery: { now: true, time: ''},
      officeAddress: null,
    }

    this.totalString = '';
    this.orderNavigate(4);
    //todo atualizar a lista
  }

  goToOrderStatus() {
    this.router.navigate(['/user-order-status']);
  }

  orderNavigate(view: number) {
    switch (view){
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