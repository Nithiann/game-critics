import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { credentialsForm } from '@game-critics/api-interfaces';

@Component({
  selector: 'game-critics-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(7)])
  })
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}


  onSubmit(credentials: credentialsForm) {
    console.log(credentials);
  }
}
