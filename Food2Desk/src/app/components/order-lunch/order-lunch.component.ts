import { Component } from '@angular/core';
import { HeaderComponent } from '../../header/header.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-order-lunch',
  standalone: true,
  imports: [HeaderComponent, CommonModule, FormsModule],
  templateUrl: './order-lunch.component.html',
  styleUrl: './order-lunch.component.scss'
})
export class OrderLunchComponent {
  consumptionType: 'entrega' | 'local' | null = null;
  selectedDishIndex: number | null = null;

  dailyDishes = [
    { name: 'Parmegiana de Frango', description: 'Filé empanado com queijo e molho', price: 22.50 },
    { name: 'Peixe Grelhado', description: 'Com legumes e arroz integral', price: 19.90 },
    { name: 'Feijoada', description: 'Completa, com farofa e couve', price: 25.00 },
    { name: 'Salada Caeser', description: 'Salada', price: 22.00 },
    { name: 'Peixe a Dore', description: 'Peixe', price: 27.00 }
  ];

  selectDish(index: number) {
    if (this.selectedDishIndex === index) {
      this.selectedDishIndex = null;
      this.consumptionType = null;
    } else {
      this.selectedDishIndex = index;
    }
  }
}
