import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../header/header.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {

  ngOnInit() {
    this.originalUser = { ...this.user };
  }

  isEditingUser = false;
  isEditingOffices = false;

  originalUser: any = {};

  user = {
    name: 'João Silva',
    email: 'joaosilva@email.com',
    cpf: '506.927.150-45',
    phone: '(12) 34567890',
    offices: [
      { block: 'A', floor: '6', number: '610' },
      // { block: 'B', floor: '1', number: '102', enterprise: 'amor em nutri' }
    ]
  };

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
    this.user.offices.push({
      block: '',
      floor: '',
      number: ''
    });
  }


}
