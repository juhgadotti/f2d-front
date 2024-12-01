import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../header/header.component';

@Component({
  selector: 'app-user-order-status',
  standalone: true,
  imports: [CommonModule, HeaderComponent],
  templateUrl: './user-order-status.component.html',
  styleUrl: './user-order-status.component.scss'
})
export class UserOrderStatusComponent {

  orders = [
    { id: 31, floor: '25', office: '2503', time: '13', items: [{
      name: 'Coca-cola', quantity: 3
    }, {
      name: 'Coxinha', quantity: 1
    }
  ] },
    { id: 2, floor: '13', office: '1301', time: '11', items: [{
      name: 'Coca-cola', quantity: 3
    }] }
  ]

}
