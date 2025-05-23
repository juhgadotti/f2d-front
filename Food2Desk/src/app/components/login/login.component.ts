import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Food2DeskApi } from '../../../environments/path';
import { User } from '../../interfaces/user';
import { HttpClient } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';


interface UserAuth {
  email: string,
  password: string
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent {
  loginForm: FormGroup;
  registerForm: FormGroup;
  officeForm: FormGroup;


  private urls = Food2DeskApi.urls;

  currentView: 'login' | 'register' | 'offices' = 'login';

  constructor(private fb: FormBuilder, private router: Router, private http: HttpClient) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    this.registerForm = this.fb.group({
      name: [''],
      email: ['', [Validators.required, Validators.email]],
      confirmEmail: [''],
      cpf: [''],
      phone: [''],
      password: ['', Validators.required],
      confirmPassword: ['']
    });

    this.officeForm = this.fb.group({
      bloco: [''],
      andar: [null],
      sala: [null]
    });

  }

  userAuth: UserAuth = {
    email: 'teste@teste.com', password: '123'
  }

  onSubmit() {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
      this.http.post<User>(this.urls.order.root, this.loginForm).subscribe(response => {
        console.log(response);
      });
    }
  }

  login() {
    this.http.post<User>(this.urls.order.root, this.userAuth).subscribe(response => {
      console.log(response);
    });
  }

  register() {
    console.log('oi')
    this.switchView(3);
  }

  switchView(view: number): void {
    console.log(view)
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
    console.log(this.currentView)
  }

  loginTest() {
    console.log('socorro')
    // this.http.get<User>(this.urls.order.root, this.loginForm).subscribe(response => {
    //   console.log(response);
    // });
  }

  submitOffice() {
    if (this.officeForm.valid) {
      this.router.navigate(['/user-home']);
      // lógica de envio aqui
    }
  }

}
