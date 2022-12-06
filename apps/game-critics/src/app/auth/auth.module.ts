import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register/register.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './auth.service';
import { ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { ButtonModule } from 'primeng/button';
import { VerifyRoutingModule } from './verify-routing.module';
import { PasswordModule } from 'primeng/password';
import { LoginComponent } from './login/login.component';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';


@NgModule({
  declarations: [RegisterComponent, LoginComponent],
  imports: [
    CommonModule,
    VerifyRoutingModule,
    ButtonModule,
    HttpClientModule,
    ReactiveFormsModule,
    InputTextModule,
    CalendarModule,
    PasswordModule,
  ],
  providers: [
    AuthService,
    JwtHelperService,
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
  ],
})
export class AuthModule {}
