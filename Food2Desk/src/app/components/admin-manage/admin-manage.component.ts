import { Component } from '@angular/core';
import { HeaderComponent } from '../../header/header.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-manage',
  standalone: true,
  imports: [CommonModule, HeaderComponent],
  templateUrl: './admin-manage.component.html',
  styleUrl: './admin-manage.component.scss'
})
export class AdminManageComponent {
  orders = [
    {
      orderId: 1,
      customer: 'Maria Silva',
      items: ['Item 1', 'Item 2', 'Item 3']
    },
    {
      orderId: 2,
      customer: 'João Souza',
      items: ['Item A', 'Item B']
    },
    {
      orderId: 3,
      customer: 'Ana Costa',
      items: []
    }
  ];
}
