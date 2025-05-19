import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../header/header.component';
import { Order } from '../user-home/order';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Food2DeskApi } from '../../../environments/path';

@Component({
  selector: 'app-user-order-status',
  standalone: true,
  imports: [CommonModule, HeaderComponent],
  templateUrl: './user-order-status.component.html',
  styleUrl: './user-order-status.component.scss'
})

export class UserOrderStatusComponent implements OnInit {
  constructor(private router: Router, private http: HttpClient) { }

  private urls = Food2DeskApi.urls;
  orderList: Order[] = [];
  showHistory = false;

  preparingOrders: Order[] = [];
  deliveryOrders: Order[] = [];
  completedOrders: Order[] = [];

  ngOnInit(): void {
    this.http.get<Order[]>(this.urls.order.root).subscribe(response => {
      this.orderList = response;

      this.preparingOrders = response.filter(order => order.status === 1);
      this.deliveryOrders = response.filter(order => order.status === 2);
      this.completedOrders = response.filter(order => order.status === 3);
    });

    const orders = [
      {
        id: 31, floor: '25', office: '2503', time: '13', status: 'Em preparação', items: [{
          name: 'Coca-cola', quantity: 1
        }, {
          name: 'Coxinha', quantity: 1
        }
        ]
      },
      {
        id: 2, floor: '13', office: '1301', time: '11', status: 'A caminho', items: [{
          name: 'Coca-cola zero', quantity: 1
        }, {
          name: 'Empada', quantity: 1
        }]
      }
    ]
  }
}
