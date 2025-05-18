import { Component, OnInit } from '@angular/core';
import { Order } from '../user-home/order';
import { HeaderComponent } from '../../header/header.component';
import { CommonModule } from '@angular/common';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { Food2DeskApi } from '../../../environments/path';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-manage',
  standalone: true,
  imports: [CommonModule, HeaderComponent, NgMultiSelectDropDownModule],
  templateUrl: './admin-manage.component.html',
  styleUrl: './admin-manage.component.scss'
})

export class AdminManageComponent implements OnInit {
  constructor(private router: Router, private http: HttpClient) { }

  private urls = Food2DeskApi.urls;
  //newOrderList: Order[] = [];
  showThirdColumn: boolean = false;
  //showDetails: boolean = false;socorro
  newOrderList: (Order & { showDetails?: boolean })[] = [];

  ngOnInit(): void {
    this.http.get<Order[]>(this.urls.order.root).subscribe(response => {
      console.log(response)
      this.newOrderList = response.map(item => ({ ...item, showDetails: false }));
    });
  }

  updateOrderStatus(order: Order, newStatus: number) {
    this.newOrderList = this.newOrderList.map(item => item.id == order.id ? { ...item, status: newStatus } : item);

    //const params = new HttpParams().set('id', order.id.toString());
    order.status = newStatus;
    this.http.put<Order>(this.urls.order.status, order).subscribe(response => {
      console.log(response)
    });
    //att a lista
  }

  orderListStatus(status: number): (Order & { showDetails?: boolean })[] {
    return this.newOrderList.filter(p => p.status == status);
  }

}
