import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HeaderComponent } from '../../header/header.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-home',
  imports: [CommonModule, HeaderComponent, FormsModule],
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.scss'],
  standalone: true
})
export class UserHomeComponent {
  constructor(private router: Router) {}
  cart: any[] = [];
  totalPrice: string = '0.00';
  orderItens: boolean =  true;
  orderSent: boolean = false;
  orderDetails: boolean = false;
  deliveryNow: boolean =  false;
  deliverySchedule: boolean =  false;
  deliveryTime: string = '';
  currentView: 'items' | 'details' | 'confirmation' = 'items';

  selectedOffice: number | null = null; 

  items = [
    { id: 1, image: "images/coca.png", name: 'Coca', description: 'Coca cola 350ml', price: 5.99 },
    { id: 2, image: "images/coxinha.jpg", name: 'Coxinha', description: 'Coxinha de frango com ou sem catupiry', price: 7.99 },
    { id: 3, name: 'Item 3', description: 'Description of item 3', price: 15.75 },
    { id: 4, name: 'Item 3', description: 'Description of item 3', price: 15.75 },
    { id: 5, name: 'Item 3', description: 'Description of item 3', price: 15.75 },
    { id: 6, name: 'Item 3', description: 'Description of item 3', price: 15.75 },
    { id: 7, name: 'Item 3', description: 'Description of item 3', price: 15.75 },
    { id: 8, name: 'Item 3', description: 'Description of item 3', price: 15.75 },
  ];

  offices = [
    { id: 1, number: '2502', floor: '25' },
    { id: 2, number: '2503', floor: '25' },
    { id: 3, number: '1301', floor: '13' }
  ]

  addToCart(item: any, isAdding: boolean) {

    const existingItem = this.cart.find(cartItem => cartItem.id === item.id);

    if (isAdding) {
      if (!existingItem) {
        this.cart.push({ ...item, quantity: 1 }); 
      } else {
        existingItem.quantity += 1; 
      }          
    } else {
        if(existingItem.quantity == 1){
          this.cart = this.cart.filter(cartItem => cartItem.id !== item.id);
        } else {
          existingItem.quantity -= 1;          
        }            
    }
    const total = this.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    this.totalPrice = total.toFixed(2).replace('.', ',');
  }

  sendOrder() {
    console.log('pedido enviado');
    this.orderItens = false;
    this.orderDetails = true;
  }

  newOrder() {
    this.cart = [];
    this.orderItens = true;
    this.orderSent = false;
    this.totalPrice = '';
  }

  goToOrderStatus() {
    this.router.navigate(['/user-order-status']);
  }

  confirmOrder() { 
    this.orderSent = true;
    this.orderItens = false;
    this.orderDetails = false;
  }
}