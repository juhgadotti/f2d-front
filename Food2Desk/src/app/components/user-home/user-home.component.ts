import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HeaderComponent } from '../../header/header.component';
import { FormsModule } from '@angular/forms';
import { Order } from '../../interfaces/order';

@Component({
  selector: 'app-user-home',
  imports: [CommonModule, HeaderComponent, FormsModule],
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.scss'],
  standalone: true
})

                
export class UserHomeComponent {
  constructor(private router: Router) {}

  //aq objeto vazio
  order: Partial<Order> = {}

  cart: any[] = [];
  
  totalPrice: string = '0.00';
  orderItens: boolean =  true;
  orderSent: boolean = false;
  //orderDetails: boolean = false;

  deliveryNow: boolean =  false;
  deliverySchedule: boolean =  false;
  deliveryTime: string = '';

  currentView: 'items' | 'details' | 'confirmation' = 'items';

  selectedOffice: number | null = null; 

  items = [
    { id: 1, image: "images/coxinha.jpg", name: 'Coxinha', description: 'Coxinha de frango com ou sem catupiry', price: 7.99 },
    { id: 2, image: "images/sand.png", name: 'Sanduiche natural', description: 'Pão, peito de peru, queijo branco e tomate', price: 12.75 },
    { id: 4, image: "images/fruitsalad.png", name: 'Salada de fruta', description: 'Maçã, banana, laranja e uva', price: 10.75 },
    { id: 5, image: "images/cafe.jpg", name: 'Café', description: 'Coado', price: 4.75 },
    { id: 6, image: "images/agua.jpg", name: 'Água', description: '500ml', price: 3.75 },
    { id: 7, image: "images/coca.png", name: 'Coca cola', description: 'Coca cola 350ml', price: 5.99 },
    { id: 8, image: "images/cocazero.png", name: 'Coca cola zero', description: 'Coca cola zero 350ml', price: 5.99 },
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

  orderDetails() {
    this.currentView = 'details';    
  }

  orderNew() {
    this.cart = [];
    this.selectedOffice = null;
    this.deliveryNow = false;
    this.deliverySchedule = false;
    this.totalPrice = '';
    this.currentView = 'items';  
  } 

  goToOrderStatus() {
    this.router.navigate(['/user-order-status']);
  }

  orderConfirm() { 
    this.currentView = 'confirmation';
  }

  backCart() {
    this.currentView = 'items';    
  }
}