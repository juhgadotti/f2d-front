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
      floor: '25',
      office: '2503',
      status: 'Preparação',
      viewStatus: true,
      items: [
        { name: 'Coca cola', quantity: 1 },
        { name: 'Empada de frango', quantity: 2 },
        { name: 'Trento de chocolate', quantity: 1 }
      ]
    },
    {
      orderId: 2,
      customer: 'João Souza',
      floor: '12',
      office: '1201',
      status: 'Entrega',
      viewStatus: true,
      items: [
        { name: 'KitKat', quantity: 1 },
        { name: 'Água', quantity: 2 }
      ]
    },
    {
      orderId: 3,
      customer: 'Caio Santos',
      floor: '6',
      office: '602',
      status: 'Entrega',
      viewStatus: true,
      items: [
        { name: 'Coxinha', quantity: 2 },
        { name: 'Suco de laranja', quantity: 1 }
      ]
    }
  ];

  showStatusUpdate(index: number) {
    this.orders[index].viewStatus = !this.orders[index].viewStatus;
  }

  statusUpdate(status: boolean, index: number) {
    if (status) { //alterar para switch case
      this.orders[index].status = 'Preparação'
    } else {
      this.orders[index].status = 'Entrega'
    }

    this.showStatusUpdate(index);

  }
}
