import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
//import { DomSanitizer } from '@angular/platform-browser';
//import { MatIconRegistry } from '@angular/material/icon';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  /*constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon('hide-pass', sanitizer.bypassSecurityTrustResourceUrl('https://icons8.com/icon/986/eye'));
    iconRegistry.addSvgIcon('show-pass', sanitizer.bypassSecurityTrustResourceUrl('https://icons8.com/icon/33916/hide'));  
  }*/

  registerForm: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder) {
    this.registerForm = this.formBuilder.group({
      fName: ['', Validators.required],
      lName: ['', Validators.required],
      userName: ['', [Validators.required, Validators.email]],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      fName: ['', Validators.required],
      lName: ['', Validators.required],
      userName: ['', [Validators.required, Validators.email]],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
    });
  }

  get f() {
    return this.registerForm.controls;
  }

  handleSignUp() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }
    
    alert('SUCCESS!! :-)\n\n')
  }
}
