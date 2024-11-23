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
  items = [
    { image: "images/coca.png", name: 'Coca', description: 'Coca cola 350ml', price: 5.99 },
    { image: "images/coxinha.jpg", name: 'Coxinha', description: 'Coxinha de frango com ou sem catupiry', price: 7.99 },
    { name: 'Item 3', description: 'Description of item 3', price: 15.75 },
  ];
  
}
