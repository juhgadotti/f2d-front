import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../header/header.component';

@Component({
  selector: 'app-user-home',
  imports: [CommonModule, HeaderComponent],
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.scss'],
  standalone: true
})
export class UserHomeComponent {
  cart: any[] = [];
  totalPrice: string = '0.00';


  items = [
    { id: 1, image: "images/coca.png", name: 'Coca', description: 'Coca cola 350ml', price: 5.99 },
    { id: 2, image: "images/coxinha.jpg", name: 'Coxinha', description: 'Coxinha de frango com ou sem catupiry', price: 7.99 },
    { id: 3, name: 'Item 3', description: 'Description of item 3', price: 15.75 },
  ];

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
}