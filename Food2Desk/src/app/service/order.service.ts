import { Injectable } from '@angular/core';
import { Order } from '../interfaces/order';

@Injectable({
  providedIn: 'root'
})

export class OrderService {

  private objectList: Order[] = [];

  constructor() {}


}
