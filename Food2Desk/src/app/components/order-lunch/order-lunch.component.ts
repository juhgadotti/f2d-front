import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../header/header.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Food2DeskApi } from '../../../environments/path';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Product } from '../../interfaces/product';
import { Order } from '../user-home/order';
import { User } from '../../interfaces/user';

@Component({
  selector: 'app-order-lunch',
  standalone: true,
  imports: [HeaderComponent, CommonModule, FormsModule],
  templateUrl: './order-lunch.component.html',
  styleUrl: './order-lunch.component.scss'
})
export class OrderLunchComponent implements OnInit {
  constructor(private router: Router, private http: HttpClient) { }

  consumptionType: 'entrega' | 'local' | null = null;
  selectedDishIndex: number | null = null;
  confirmation: boolean = false;
  dailyDishes: Product[] = [];
  order: Partial<Order> = { cart: [], office: {
    officeId: '',
    floor: '',
    number: '',
    block: null
  } };
  user: User = {} as User;
  selectedOffice!: User['offices'][0] | null;

  private urls = Food2DeskApi.urls;

  ngOnInit() {
    const weekDay = 6;
    this.http.get<Product[]>(`${this.urls.product.lunch}/${weekDay}`).subscribe(response => {
      this.dailyDishes = response;
    });

    const userId = localStorage.getItem('userId');
    this.http.get<User>(`${this.urls.user.root}/${userId}`).subscribe(response => {
      this.user = response;
    });
  }

  selectDish(index: number) {
    if (this.selectedDishIndex === index) {
      this.selectedDishIndex = null;
      this.consumptionType = null;
    } else {
      this.selectedDishIndex = index;
    }
  }

  sendOrder(index: number) {
    console.log(index)
    this.confirmation = true;

    const lunch = this.dailyDishes[index];
    const sendLunch = {
      quantity: 1,
      price: lunch.price,
      name: lunch.name,
      id: ''
    };

    this.order.cart?.push(sendLunch);
    this.order.userId = localStorage.getItem('userId') ?? undefined;
    this.order.toDelivery = this.consumptionType == 'entrega' ? true : false;
    this.order.totalCharge = lunch.price;
    this.order.isLunch = true;

    if (this.order.toDelivery == true) {
      this.order.office = this.selectedOffice;
    }

    this.http.post<Order>(this.urls.order.root, this.order).subscribe(response => {
      console.log(response)
    });
  }

  cleanOfficeOption(){
    this.selectedOffice = null;
  }
}
