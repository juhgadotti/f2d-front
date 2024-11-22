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
    { image: '../../img/food/coca.png', name: 'Item 1', description: 'Description of item 1', price: 10.99 },
    { name: 'Item 2', description: 'Description of item 2', price: 20.49 },
    { name: 'Item 3', description: 'Description of item 3', price: 15.75 },
  ];
  
}
