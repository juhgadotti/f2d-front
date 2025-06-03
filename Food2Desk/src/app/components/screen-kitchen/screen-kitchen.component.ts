import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../header/header.component';
import { Order } from '../user-home/order';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Food2DeskApi } from '../../../environments/path';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-screen-kitchen',
  standalone: true,
  imports: [HeaderComponent, CommonModule],
  templateUrl: './screen-kitchen.component.html',
  styleUrl: './screen-kitchen.component.scss'
})
export class ScreenKitchenComponent implements OnInit {
  constructor(private router: Router, private http: HttpClient) { }

  private urls = Food2DeskApi.urls;
  orderList: Order[] = [];

  ngOnInit(): void {
    this.http.get<Order[]>(this.urls.order.root).subscribe(response => {
      console.log(response)
      this.orderList = response.filter(p => p.status == 0 && p.isLunch == false);
    });
  }

  refresh(){
    this.http.get<Order[]>(this.urls.order.root).subscribe(response => {     
      this.orderList = response.filter(p => p.status == 0 && p.isLunch == false);
    });
  }
}
