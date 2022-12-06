import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { credentialsForm, verification } from '@game-critics/api-interfaces';
import { AuthService } from '../auth.service';

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
  constructor(protected _service: AuthService, protected router: Router) {}


  onSubmit(credentials: credentialsForm) {
    this._service.login(credentials)
    .subscribe((res) => {
      this.router.navigate(['/games'])
    })
  }
}
