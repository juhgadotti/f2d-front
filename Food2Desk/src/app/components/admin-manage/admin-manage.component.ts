import { Component } from '@angular/core';
import { HeaderComponent } from '../../header/header.component';
import { CommonModule } from '@angular/common';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-admin-manage',
  standalone: true,
  imports: [CommonModule, HeaderComponent, NgMultiSelectDropDownModule],
  templateUrl: './admin-manage.component.html',
  styleUrl: './admin-manage.component.scss'
})
export class AdminManageComponent {
  orders = [
    {
      orderId: 1,
      customer: 'Maria Silva',
      items: [
        { name: 'Item 1', quantity: 3 },
        { name: 'Item 2', quantity: 1 },
        { name: 'Item 3', quantity: 5 }
      ]
    },
    {
      orderId: 2,
      customer: 'João Souza',
      items: [
        { name: 'Item A', quantity: 2 },
        { name: 'Item B', quantity: 4 }
      ]
    },
    {
      orderId: 3,
      customer: 'Ana Costa',
      items: [] // Pedido sem itens
    }
  ];
}
