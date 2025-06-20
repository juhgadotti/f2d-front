import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LocalStorageService } from '../services/local-storage.service';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  constructor(private router: Router) {

  }
  isUser: boolean = true;

  ngOnInit(): void {
     const usuario = localStorage.getItem('admin');
     console.log(usuario)
     if(usuario == 'true'){
      console.log('a')
      this.isUser = false;
     } else {
      this.isUser = true;
     }
  }

  redirectUser(url: number) {
    switch (url) {
      case 1:
        this.router.navigate(['/user-home'])
        break;
      case 2:
        this.router.navigate(['/user-order-status'])
        break;
      case 3:
        this.router.navigate(['/profile'])
        break;
    }
  }

  redirectAdmin(url: number) {
    switch (url) {
      case 1:
        this.router.navigate(['/admin-home'])
        break;
      case 2:
        this.router.navigate(['/admin-manage'])
        break;
      case 3:
        this.router.navigate(['/product-management'])
        break;
    }
  }

  logout(){
    localStorage.setItem('admin', 'false');
    this.router.navigate(['/login'])
  }
}
