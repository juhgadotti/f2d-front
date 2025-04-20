import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Food2DeskApi } from '../../../environments/path';
import { User } from '../../interfaces/user';
import { HttpClient } from '@angular/common/http';

interface UserAuth {
  email: string,
  password: string 
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent {
  loginForm: FormGroup;

  private urls = Food2DeskApi.urls;

  currentView: 'login' | 'register' = 'login';

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
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

  login(){
    this.http.post<User>(this.urls.order.root, this.userAuth).subscribe(response => {
      console.log(response);
    });
  }

  register(){

  }
  switchView(view: number):void {
    this.currentView = view == 1 ? 'login' : 'register';
  }

  loginTest(){
    console.log('socorro')
    // this.http.get<User>(this.urls.order.root, this.loginForm).subscribe(response => {
    //   console.log(response);
    // });
  }
}
