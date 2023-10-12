import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MustMatch } from './must-match.validator';
import { UserService } from 'src/app/services/user-service/user.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SignupComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder, private signupService: UserService, public router: Router, public snackBar: MatSnackBar) {
    this.registerForm = this.formBuilder.group(
      {
        fName: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
        lName: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
        userName: ['', [Validators.required, Validators.email]],
        newPassword: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
      },
      { validator: MustMatch('newPassword', 'confirmPassword'), }
  )}

  ngOnInit() {
    this.registerForm = this.formBuilder.group(
      {
        fName: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
        lName: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
        userName: ['', [Validators.required, Validators.email]],
        newPassword: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
      },
      { validator: MustMatch('newPassword', 'confirmPassword'), }
  )}

  get f() {
    return this.registerForm.controls;
  }

  get fName() {
    return this.registerForm.get('fName');
  }

  get lName() {
    return this.registerForm.get('lName');
  }

  get userName() {
    return this.registerForm.get('userName');
  }

  get newPassword() {
    return this.registerForm.get('newPassword');
  }

  get confirmPassword() {
    return this.registerForm.get('confirmPassword');
  }

  openIncorrectValueMsg(msg = "") {
    this.snackBar.open(msg, "",{
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    });
  }

  async handleSignUp() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      this.openIncorrectValueMsg('Please enter correct values')
      return;
    }

    const { fName, lName, userName, newPassword } = this.registerForm.value

    const res = await this.signupService.signup({ "firstName": fName, "lastName": lName, "email": userName, "password": newPassword, "service": "advance" })
    if(res?.status == 422) this.openIncorrectValueMsg("Email Id is already registered..!! Use different mail id / Sign in instead") 
    if(res?.data) {
      this.openIncorrectValueMsg("Signup Sucessful..!!")
      this.router.navigate(["/login"])
    }  
  }
}