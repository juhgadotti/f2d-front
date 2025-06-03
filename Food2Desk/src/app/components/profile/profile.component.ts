import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../header/header.component';
import { FormsModule } from '@angular/forms';
import { User } from '../../interfaces/user';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Food2DeskApi } from '../../../environments/path';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})


export class ProfileComponent implements OnInit {
  constructor(private router: Router, private http: HttpClient) { }
    private urls = Food2DeskApi.urls;

  user: any = {};

  ngOnInit() {
     const userId = localStorage.getItem('userId');
    
    this.http.get<User>(`${this.urls.user.root}/${userId}`).subscribe(response => {
      this.user =  response;
      console.log(response)
    });    
  }

  isEditingUser = false;
  isEditingOffices = false;

  originalUser: any = {};

  // user = {
  //   name: 'João Silva',
  //   email: 'joaosilva@email.com',
  //   cpf: '506.927.150-45',
  //   phone: '(12) 34567890',
  //   offices: [
  //     { block: 'A', floor: '6', number: '610' },
  //     // { block: 'B', floor: '1', number: '102', enterprise: 'amor em nutri' }
  //   ]
  // };

  saveUserEdit() {
    this.isEditingUser = false;
    // Aqui você pode fazer uma chamada para salvar no backend
    console.log('Usuário atualizado:', this.user);
  }

  cancelUserEdit() {
    this.user = { ...this.originalUser };
    this.isEditingUser = false;
  }

  editOffice(index: number) {
    const office = this.user.offices[index];
    console.log('Abrir modal para editar escritório:', office);
    // Em breve: abrir modal com formulário
  }

  removeOffice(index: number) {
    if (confirm('Tem certeza que deseja remover este escritório?')) {
      this.user.offices.splice(index, 1);
    }
  }

  addOffice() {
    const block = prompt(`Insira o bloco:`);
    const floor = prompt(`Insira o andar:`);
    const number = prompt(`Insira o número do escritorio:`);
    
    // this.user.offices.push({
    //   block: block,
    //   floor: floor,
    //   number: number
    // });

    const newOffice = {
      block: block,
      floor: floor,
      number: number,
      userId: localStorage.getItem('userId')
    };

    this.http.post(`${this.urls.user.office}`, newOffice).subscribe(response => {      
      this.user.offices.push(response);
    }); 

  }
}
