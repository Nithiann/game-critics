import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { userRegistration } from '@game-critics/api-interfaces';
import { AuthService } from '../auth.service';

@Component({
  selector: 'game-critics-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    displayName: new FormControl('', Validators.required),
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    age: new FormControl(new Date(), Validators.required)
  })

  constructor(private service: AuthService, protected router: Router) {}

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method, @typescript-eslint/no-empty-function
  ngOnInit(): void {}

  onSubmit(user: userRegistration) {
    this.service.register(user)
    .subscribe((res) => {
      this.router.navigate(['games'])
    });
  }
}
