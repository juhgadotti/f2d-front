import { Injectable } from '@angular/core';
import { Order } from './order';

@Injectable({
  providedIn: 'root'
})

export class OrderService {

  private objectList: Order[] = [];

  constructor() {}
  

}
