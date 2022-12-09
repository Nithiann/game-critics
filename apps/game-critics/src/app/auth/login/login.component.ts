import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { credentialsForm, UserIdentity, userInfo, verification } from '@game-critics/api-interfaces';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';

@Component({
  selector: 'game-critics-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  subs!: Subscription;
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(7)])
  })
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor(protected _service: AuthService, protected router: Router) {
    this.subs = this._service
      .getUserFromLocalStorage()
      .subscribe((user: userInfo | undefined) => {
        if (user) {
          console.log('User already logged in > to dashboard');
          this.router.navigate(['/']);
        }
      });
  }


  onSubmit(credentials: credentialsForm) {
    this._service.login(credentials)
    .subscribe((user: verification | undefined) => {
      if (user)
        this.router.navigate(['/games'])
    })
  }
}
