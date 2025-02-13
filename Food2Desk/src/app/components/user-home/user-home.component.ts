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
  order: Partial<Order> = {};

  cart: any[] = []; //dentro do order
  ngOnInit(): void { //load
    this.http.get<Product[]>(this.urls.product.root).subscribe(response => {
      console.log(response)
      this.productsList = response;
    });
  }

  //aq objeto vazio
  //order: Partial<Order> = {}
  //itens: Item[] = []; //aq vai puxar a lista do backend


  details: Details = {
    delivery: { now: true, time: ''},
    officeAddress: null
  }
  
  totalPrice: string = '0.00'; 
  orderItens: boolean =  true;
  orderSent: boolean = false;
  //orderDetails: boolean = false;
  
  currentView: 'items' | 'details' | 'confirmation' = 'items';

  selectedOffice: number | null = null;
  
  offices = [
    { id: 1, number: '2502', floor: '25' },
    { id: 2, number: '2503', floor: '25' },
    { id: 3, number: '1301', floor: '13' }
  ]

  addToCart(product: any, isAdding: boolean) {
    const existingItem = this.cart.find(cartItem => cartItem.id === product.id);

    if (isAdding) {
      if (!existingItem) {
        //this.cart.push({ ...item, quantity: 1 }); 
        this.cart.push({...product, quantity: 1});
        
      } else {
        existingItem.quantity += 1; 
      }          
    } else {
        if(existingItem.quantity == 1){
          this.cart = this.cart.filter(cartItem => cartItem.id !== product.id);
        } else {
          existingItem.quantity -= 1;          
        }            
    }
    const total = this.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    this.totalPrice = total.toFixed(2).replace('.', ',');
  }

  newOrder(): void {
    order: {} 
    this.details = {
      delivery: { now: true, time: ''},
      officeAddress: null,
    }
    this.totalPrice = '';
    this.cart = [];
    this.orderNavigate(3);
  }

  sendOrder(): void { //vai retornar o recebimento do pedido
    //this.http.put<order>().subscribe(response => {
    //  console.log(response)
    //});        
    this.orderNavigate(2);
  }

  orderNew() {
    this.cart = [];
    this.selectedOffice = null;
    //this.delivery.now = false;
    this.totalPrice = '';
  } 

  goToOrderStatus() {
    this.router.navigate(['/user-order-status']);
  }

  orderNavigate(view: number){
    switch (view){
      case 1:
        this.currentView = 'details';
        break;
      case 2:
        this.currentView = 'confirmation';
        break;
      case 3:
      default:
        this.currentView = 'items';
        break;
    }
  }
}