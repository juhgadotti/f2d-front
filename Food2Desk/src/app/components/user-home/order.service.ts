import { Injectable } from '@angular/core';
import { Order } from '../user-home/order';

@Injectable({
  providedIn: 'root'
})

export class OrderService {

  private objectList: Order[] = [];

  constructor() {}
  

}
