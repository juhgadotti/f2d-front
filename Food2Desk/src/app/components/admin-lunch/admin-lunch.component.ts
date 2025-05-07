import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../header/header.component';
import { CommonModule } from '@angular/common';
import { Lunch } from '../../interfaces/lunch';


@Component({
  selector: 'app-admin-lunch',
  standalone: true,
  imports: [HeaderComponent, CommonModule],
  templateUrl: './admin-lunch.component.html',
  styleUrl: './admin-lunch.component.scss',
})

export class AdminLunchComponent implements OnInit {
  lunchList: Lunch[] = [];
  showCompleted: boolean = false;
  selectedTab: 'local' | 'delivery' = 'local';

  ngOnInit(): void {
    // Dados mockados para testes
    this.lunchList = [
      {
        id: 101,
        userName: 'Ana Souza',
        status: 1,
        toDelivery: false,
        product: { id: 'p1', name: 'Prato Executivo', price: 25 },
        office: null
      },
      {
        id: 102,
        userName: 'Carlos Lima',
        status: 3,
        toDelivery: false,
        product: { id: 'p2', name: 'Filé com Batata', price: 32 },
        office: null
      },
      {
        id: 103,
        userName: 'Fernanda Costa',
        status: 1,
        toDelivery: true,
        product: { id: 'p3', name: 'Vegano', price: 28 },
        office: { officeId: 'o1', floor: '7', number: '707', block: null }
      },
      {
        id: 104,
        userName: 'Bruno Silva',
        status: 2,
        toDelivery: true,
        product: { id: 'p4', name: 'Strogonoff', price: 30 },
        office: { officeId: 'o2', floor: '3', number: '305', block: 'B' }
      },
      {
        id: 105,
        userName: 'Mariana Teixeira',
        status: 3,
        toDelivery: true,
        product: { id: 'p5', name: 'Salada Completa', price: 22 },
        office: { officeId: 'o3', floor: '2', number: '201', block: null }
      }
    ];
  }

  getLunchListByStatus(status: number): Lunch[] {
  return this.lunchList.filter(item => item.status === status && !item.toDelivery);
}


  updateLunchStatus(order: Lunch, newStatus: number): void {
    this.lunchList = this.lunchList.map(o =>
      o.id === order.id ? { ...o, status: newStatus } : o
    );
  }

  lunchListStatus(status: number, toDelivery?: boolean): Lunch[] {
    return this.lunchList.filter(p =>
      p.status === status &&
      (toDelivery === undefined || p.toDelivery === toDelivery)
    );
  }

}
