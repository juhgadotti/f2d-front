import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../header/header.component';
import { CommonModule } from '@angular/common';

export interface Lunch {
  id: number;
  userName: string;
  status: number;
  product: { id: string; name: string; price: number };
  office: { officeId: string; floor: string; number: string; block: string | null } | null;
}

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

  ngOnInit(): void {
    // Dados mockados para testes
    this.lunchList = [
      {
        id: 101,
        userName: 'João Silva',
        status: 1,
        product: { id: 'p01', name: 'Prato Executivo', price: 22.5 },
        office: { officeId: 'of1', floor: '3', number: '305', block: 'B' },
      },
      {
        id: 102,
        userName: 'Maria Souza',
        status: 1,
        product: { id: 'p02', name: 'Salada Vegana', price: 18.0 },
        office: { officeId: 'of2', floor: '5', number: '502', block: null },
      },
      {
        id: 103,
        userName: 'Carlos Lima',
        status: 2,
        product: { id: 'p03', name: 'Feijoada', price: 28.0 },
        office: { officeId: 'of3', floor: '2', number: '204', block: 'A' },
      }
    ];
  }

  updateLunchStatus(order: Lunch, newStatus: number): void {
    this.lunchList = this.lunchList.map(o =>
      o.id === order.id ? { ...o, status: newStatus } : o
    );
  }

  lunchListStatus(status: number): Lunch[] {
    return this.lunchList.filter(o => o.status === status);
  }
}
