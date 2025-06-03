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
      this.deliveryList = response.filter(p => p.status == 1 && p.isLunch == false);
      this.deliveryList = this.deliveryList .map(item => ({ ...item, showDetails: false }));
      this.lunchList = response.filter(p => p.status == 1 &&  p.isLunch == true); //
    });   
  }

  getLists(){
    this.http.get<Order[]>(this.urls.order.root).subscribe(response => {
      this.deliveryList = response.filter(p => p.status == 1 && p.isLunch == false);
      this.deliveryList = this.deliveryList .map(item => ({ ...item, showDetails: false }));
      this.lunchList = response.filter(p => p.status == 1 &&  p.isLunch == true && p.toDelivery == true); //
    });   
  }

  updateOrderStatus(item: any) {
    console.log(item);
    item.status = 2;
     this.http.put(this.urls.order.status, item).subscribe(response => {
      this.getLists();
    });
  }
}
