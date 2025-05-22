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
  showOrder: boolean = true;
  lunchList: Order[] = [];

  ngOnInit(): void {
    this.http.get<Order[]>(this.urls.order.root).subscribe(response => {
      console.log(response)
      this.deliveryList = response.filter(p => p.status == 2); //&& p.isLunch == false
      this.deliveryList = this.deliveryList .map(item => ({ ...item, showDetails: false }));
      console.log(this.deliveryList)
      this.lunchList = response.filter(p => p.status != 2); //l => l.isLunch == true
    });
  }

  updateOrderStatus(item: any) {
    console.log(item);
  }
}
