import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from '../../interfaces/product';
import { Food2DeskApi } from '../../../environments/path';

@Component({
  selector: 'app-product-lunch',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-lunch.component.html',
  styleUrl: './product-lunch.component.scss'
})





export class ProductLunchComponent implements OnInit {
  constructor(private router: Router, private http: HttpClient) { }
  dayMap: { [key: number]: string } = {
    1: 'Segunda',
    2: 'Terça',
    3: 'Quarta',
    4: 'Quinta',
    5: 'Sexta',
    6: 'Sabado',
    7: 'Domingo'
  };

  lunchMenu: { [key: string]: Product[] } = {
    'Segunda': [],
    'Terça': [],
    'Quarta': [],
    'Quinta': [],
    'Sexta': [],
    'Sabado': [],
    'Domingo': []
  };

  private urls = Food2DeskApi.urls;

  ngOnInit(): void {
    this.http.get<Product[]>(this.urls.product.lunch).subscribe(response => {
      for (const key in this.lunchMenu) {
        this.lunchMenu[key] = [];
      }

      for (const product of response) {
        if (product.weekDay != null) { // apenas se for diferente de null
          const dayName = this.dayMap[product.weekDay];
          if (dayName) {
            this.lunchMenu[dayName].push(product);
          }
        }
      }
    });

  }
  weekDays = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sabado', 'Domingo'];

  editMode: { [key: string]: boolean } = {};

  addDish(day: string) {
    const weekDay = this.weekDays.indexOf(day) + 1;
    const dishName = prompt(`Digite o nome do prato para ${day}:`);
    const quantity = prompt(`Digite a quantidade de porções para ${dishName}:`);
    const price = prompt(`Digite o valor de ${dishName}:`);


    const newLunch = {
      name: dishName,
      quantity: quantity,
      price: price,
      weekDay: weekDay,
      category: 'Almoço'
    };

    if (dishName && quantity && !isNaN(Number(quantity))) {
      this.http.post<Product>(this.urls.product.lunch, newLunch).subscribe(response => {
        if (response.weekDay != null) {
          const dayName = this.weekDays[response.weekDay - 1];
          if (dayName && this.lunchMenu[dayName]) {
            this.lunchMenu[dayName].push({
              name: response.name,
              quantity: response.quantity,
              price: response.price,
              id: response.id,
              imageUrl: '',
              description: '',
              category: '',
              status: '',
              weekDay: null
            });
          }
        }
      });
    } 
  }

  toggleEditMode(day: string) {
    this.editMode[day] = !this.editMode[day];
  }

  removeDish(day: string, index: number) {
  const dish = this.lunchMenu[day][index];

  if (dish && dish.id) {
    // Envia pro backend para deletar pelo ID
    this.http.delete(`${this.urls.product.lunch}/${dish.id}`).subscribe(() => {
      // Remove do front após confirmar a exclusão
      this.lunchMenu[day].splice(index, 1);
    });
  }
}
}
