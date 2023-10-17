import { Component, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatIconRegistry } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user-service/user.service';
import { HIDE_PASS_ICON, SHOW_PASS_ICON } from 'src/assets/svg-icons';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class LoginComponent {
  loginForm: FormGroup;
  submitted = false;
  passType = "hide";

  constructor(public formBuilder: FormBuilder, private loginService: UserService, public router: Router, private snackBar: MatSnackBar, iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    this.loginForm = this.formBuilder.group({
      userName: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
    iconRegistry.addSvgIconLiteral('show-password-icon', sanitizer.bypassSecurityTrustHtml(SHOW_PASS_ICON));
    iconRegistry.addSvgIconLiteral('hide-password-icon', sanitizer.bypassSecurityTrustHtml(HIDE_PASS_ICON));
  } 

  get userName() {
    return this.loginForm.get('userName');
  }

  get password() {
    return this.loginForm.get('password');
  }

  openFailedLoginMsg(msg = "") {
    this.snackBar.open(msg, "",{
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    });
  }

  togglePasswordVisibility(visibility = "hide") {  
    this.passType = visibility
  }

  async handleLogin() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }

    const { userName, password } = this.loginForm.value
    const res = await this.loginService.login({ "email": userName, "password": password })
    if(res?.status) {
      this.openFailedLoginMsg('Invalid Username / Password')
      this.loginForm.reset()
    }

    if(res?.id) {
      this.openFailedLoginMsg("Login Sucessfully...!!!")
      this.router.navigate(["dashboard/notes"])
    }
  }
}
