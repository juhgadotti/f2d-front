import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../header/header.component';
import { CommonModule } from '@angular/common';
import { Lunch } from '../../interfaces/lunch';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Order } from '../user-home/order';
import { Food2DeskApi } from '../../../environments/path';


@Component({
  selector: 'app-admin-lunch',
  standalone: true,
  imports: [HeaderComponent, CommonModule],
  templateUrl: './admin-lunch.component.html',
  styleUrl: './admin-lunch.component.scss',
})

export class AdminLunchComponent implements OnInit {
  constructor(private router: Router, private http: HttpClient) { }

  private urls = Food2DeskApi.urls;


  lunchList: Order[] = [];
  lunchCompleted: Order[] = [];

  lunchLocal: Order[] = [];
  lunchDelivery: Order[] = [];

  showThirdColumn: boolean = false;
  selectedTab: 'local' | 'delivery' = 'local';

  ngOnInit(): void {
    this.http.get<Order[]>(this.urls.order.root).subscribe(response => {
      this.lunchList = response.filter(p => p.isLunch == true && p.toDelivery == false && p.status == 0);
      this.lunchCompleted = response.filter(p => p.isLunch == true && p.toDelivery == false && p.status == 2);
    });
  }

  getLists() {
    this.http.get<Order[]>(this.urls.order.root).subscribe(response => {
      this.lunchList = response.filter(p => p.isLunch == true && p.toDelivery == false && p.status == 0);
      this.lunchCompleted = response.filter(p => p.isLunch == true && p.toDelivery == false && p.status == 2);
    });
  }

  updateOrderStatus(item: any) {
    console.log(item);
    item.status = 2;
    this.http.put(this.urls.order.status, item).subscribe(response => {
      console.log(item);
    });

    const index = this.lunchList.findIndex(i => i.id === item.id);
    if (index !== -1) {
      this.lunchList.splice(index, 1);
    }

    this.lunchCompleted.push(item);
  }

  //

  lunchListStatus(status: number, toDelivery?: boolean): Order[] {
    return this.lunchList.filter(p =>
      p.status === status &&
      (toDelivery === undefined || p.toDelivery === toDelivery)
    );
  }
}
