import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HeaderComponent } from '../../header/header.component';
import { FormsModule } from '@angular/forms';
import { Order } from './order';
import { User } from '../../interfaces/user';
import { Product } from '../../interfaces/product';
import { HttpClient } from '@angular/common/http';
import { Food2DeskApi } from '../../../environments/path';
import { Observable } from 'rxjs';

interface Delivery {
  now: boolean,
  time: string | null
}

@Component({
  selector: 'app-user-home',
  imports: [CommonModule, HeaderComponent, FormsModule],
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.scss'],
  standalone: true
})
   
export class UserHomeComponent implements OnInit {
  constructor(private router: Router, private http: HttpClient) {}
  
  private urls = Food2DeskApi.urls;

  productsList: Product[] = [];
  order: Partial<Order> = { cart: [] };
  user: User = {} as User; //q isso aqui meu deus
  totalString: string | undefined = '';

  ngOnInit(): void { //load

    this.http.get<Product[]>(this.urls.product.root).subscribe(response => {
      this.productsList = response;
    });
    
    this.http.get<User>(this.urls.user.root).subscribe(response =>{
      this.user = response;
    });

  }

  delivery: Delivery = {
     now: true, time: null
  }
  
  orderItens: boolean =  true;
  orderSent: boolean = false;
  //orderDetails: boolean = false;
  
  currentView: 'items' | 'details' | 'review'| 'confirmation'  = 'items';

  selectedOffice!: User['offices'][0] | null;

  addToCart(product: any) {
    console.log(product);
    const item = this.order.cart?.find(cartItem => cartItem.id === product.id);
    if(!item) {
        this.order.cart?.push({...product, quantity: 1});
    }
    else {
       item.quantity++;
    }
    this.calculateTotalPrice();    
  }

  removeFromCart(product: any){
    if(product.quantity > 1)
      product.quantity--;
    else  {
      this.order.cart = this.order.cart?.filter(cartItem => cartItem.id !== product.id);
    }
    this.calculateTotalPrice();
  }

  calculateTotalPrice(): void{
    this.order.totalCharge = this.order.cart?.reduce((sum, item) => sum + item.price * item.quantity, 0);
    this.totalString = this.order.totalCharge?.toFixed(2).replace('.', ',');
  }

  sendOrder(): void { //vai retornar o recebimento do pedido
    this.order.deliverNow = this.delivery.now;
    this.order.deliveryTime = this.delivery.time?.toString();
    //this.order.office?.floor.at;
    //this.http.put<order>().subscribe(response => {
    //  console.log(response)
    //});     
    //this.http.post<Order>(this.urls.order.root, this.order, ).pipe(response =>{
    //  console.log(response);
    //});
    
    this.orderNavigate(2);
  }

  test() {
    console.log(this.order);    

    this.http.post<Order>(this.urls.order.root, this.order).subscribe(response => {
      console.log(response);
    });
    this.orderNavigate(3);
    //this.http.post<Order>(this.urls.order.root, this.order).subscribe(response => {
    //  console.log(response);
    //});
  }

  newOrder(): void {
    this.order = {};
    this.order.cart = [];
    this.selectedOffice = null;

    this.delivery = {
       now: true, time: ''
    }

    this.totalString = '';
    this.orderNavigate(4);
    
    this.http.get<Product[]>(this.urls.product.root).subscribe(response => {
      this.productsList = response;
    });
  }

  goToOrderStatus() {
    this.router.navigate(['/user-order-status']);
  }

  onOfficeSelect(){
    this.order.office = this.selectedOffice;
  }

  orderNavigate(view: number) {
    switch (view){
      case 1:
        this.currentView = 'details';
        break;
      case 2:
        this.currentView = 'review';
        break;
      case 3:
        this.currentView = 'confirmation';
        break;
      case 4:
      default:
        this.currentView = 'items';
        break;
    }
  }
}