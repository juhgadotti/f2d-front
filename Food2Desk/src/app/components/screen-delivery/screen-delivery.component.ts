import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../header/header.component';
import { CommonModule } from '@angular/common';
import { Food2DeskApi } from '../../../environments/path';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Order } from '../user-home/order';

@Component({
  selector: 'app-screen-delivery',
  standalone: true,
  imports: [HeaderComponent, CommonModule],
  templateUrl: './screen-delivery.component.html',
  styleUrl: './screen-delivery.component.scss'
})
export class ScreenDeliveryComponent implements OnInit {
  constructor(private router: Router, private http: HttpClient) { }

  private urls = Food2DeskApi.urls;
  deliveryList: (Order & { showDetails?: boolean })[] = [];

  ngOnInit(): void {
    this.http.get<Order[]>(this.urls.order.root).subscribe(response => {
      console.log(response)
      this.deliveryList = response.filter(p => p.status == 2);
      this.deliveryList = this.deliveryList .map(item => ({ ...item, showDetails: false }));
    });
  }

  updateOrderStatus(item: any) {
    console.log(item);
  }
}
