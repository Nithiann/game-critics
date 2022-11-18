import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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

  constructor(private service: AuthService) {}

  ngOnInit(): void {

  }

  onSubmit(user: userRegistration) {
    this.service.register(user)
    .subscribe((res) => {
      console.log(res);
    });
  }
}
