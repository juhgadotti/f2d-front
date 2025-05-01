import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-lunch',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-lunch.component.html',
  styleUrl: './product-lunch.component.scss'
})

export class ProductLunchComponent {
  weekDays = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sabado', 'Domingo'];

  lunchMenu: { [key: string]: { name: string; quantity: number }[] } = {
    'Segunda': [{ name: 'Parmegiana de Frango', quantity: 20 }, { name: 'Peixe', quantity: 15 }],
    'Terça': [{ name: 'Feijoada', quantity: 30 }, { name: 'Bife Acebolado', quantity: 15 }],
    'Quarta': [],
    'Quinta': [],
    'Sexta': [],
    'Sabado': [],
    'Domingo': [],
  };

  editMode: { [key: string]: boolean } = {};

  addDish(day: string) {
    const dishName = prompt(`Digite o nome do prato para ${day}:`);
    const quantity = prompt(`Digite a quantidade de porções para ${dishName}:`);

    if (dishName && quantity && !isNaN(Number(quantity))) {
      this.lunchMenu[day].push({ name: dishName, quantity: Number(quantity) });
    }
  }

  toggleEditMode(day: string) {
    this.editMode[day] = !this.editMode[day];
  }

  removeDish(day: string, index: number) {
    this.lunchMenu[day].splice(index, 1);
  }
}
