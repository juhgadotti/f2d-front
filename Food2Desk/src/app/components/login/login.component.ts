import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Food2DeskApi } from '../../../environments/path';
import { User } from '../../interfaces/user';
import { HttpClient } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserAuth } from '../../interfaces/userAuth';
import { UserRegister } from '../../interfaces/userRegister';
import { CommonModule } from '@angular/common';
import { LocalStorageService } from '../../services/local-storage.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent {
  loginForm: FormGroup;
  registerForm: FormGroup;
  officeForm: FormGroup;
  userId: string = '';

  private urls = Food2DeskApi.urls;

  currentView: 'login' | 'register' | 'offices' = 'login';

  userAuth: UserAuth = {
    email: '',
    password: '',
    isLogged: false,
    userId: null
  };

  userRegister: UserRegister = {
    name: '',
    email: '',
    password: '',
    doc: '',
    phone: ''
    // office: {floor: '', number: '', block: ''}
  }

  invalidPassword: boolean = false;

  constructor(private fb: FormBuilder, private router: Router, private http: HttpClient) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    // this.registerForm = this.fb.group({
    //   name: [''],
    //   email: ['', [Validators.required, Validators.email]],
    //   confirmEmail: [''],
    //   cpf: [''],
    //   phone: [''],
    //   password: ['', Validators.required],
    //   confirmPassword: ['']
    // });

    this.registerForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    doc: ['', Validators.required],
    phone: ['', Validators.required]
  });

    this.officeForm = this.fb.group({
      block: [''],
      floor: [null],
      number: [null]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
      this.http.post<User>(this.urls.order.root, this.loginForm).subscribe(response => {        
      });
    }
  }

  login() {
    this.userAuth.email = this.loginForm.value.email;
    this.userAuth.password = this.loginForm.value.password;

    if(this.loginForm.value.email == 'admin@snack2desk.com'){
      localStorage.setItem('admin', 'true');
      const usuario = localStorage.getItem('admin');
      this.router.navigate(['/admin-home'])
    }

    this.http.put<UserAuth>(this.urls.user.auth, this.userAuth).subscribe({
      next: (response) => {
        console.log('Login bem-sucedido', response);
        
        this.router.navigate(['/user-home'])
      },
      error: (err) => {
        console.error('Erro no login', err);
      }
    });      
  }

  switchView(view: number): void {
    switch (view) {
      case 1:
        this.currentView = 'login';
        break;
      case 2:
        this.currentView = 'register';
        break;
      case 3:
        this.currentView = 'offices';
        break;
    }
  }

    register() {
    console.log(this.registerForm)

    this.userRegister.name = this.registerForm.value.name;
    this.userRegister.doc = this.registerForm.value.doc;
    this.userRegister.email = this.registerForm.value.email;    
    this.userRegister.password = this.registerForm.value.password;
    this.userRegister.phone = this.registerForm.value.phone;
    const payload = this.registerForm.value;
    console.log(payload)

    this.http.post<any>(this.urls.user.root, this.userRegister).subscribe(response => {
      console.log(response)
      this.userId = response.id;
    });
    this.switchView(3);
  }

  submitOffice() {
    if (this.officeForm.valid) {
        const office = {
          floor: this.officeForm.value.floor,
          number: this.officeForm.value.number,
          block: this.officeForm.value.block,
          id: this.userId        
        };
      console.log(office)

      this.http.post(this.urls.user.office, office).subscribe(response => {
      console.log(response)
    });
    localStorage.setItem('admin', 'false');
      this.router.navigate(['/user-home']);
      // lógica de envio aqui
    }
  }
}