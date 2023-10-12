import { Component, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user-service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class LoginComponent {
  loginForm: FormGroup;
  submitted = false;

  constructor(public formBuilder: FormBuilder, private loginService: UserService, public router: Router, private snackBar: MatSnackBar) {
    this.loginForm = this.formBuilder.group({
      userName: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  } 

  get userName() {
    return this.loginForm.get('userName');
  }

  get password() {
    return this.loginForm.get('password');
  }

  openFailedLoginMsg() {
    this.snackBar.open('Invalid Username / Password', "",{
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    });
  }

  async handleLogin() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }

    const { userName, password } = this.loginForm.value
    const res = await this.loginService.login({ "email": userName, "password": password })
    if(res?.status) {
      this.openFailedLoginMsg()
      this.loginForm.reset()
    }

    if(res?.id) this.router.navigate(["dashboard/notes"]) 
  }
}
