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

}
