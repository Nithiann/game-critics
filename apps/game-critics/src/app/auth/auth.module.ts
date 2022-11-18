import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register/register.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './auth.service';
import { ReactiveFormsModule } from '@angular/forms';
import {InputTextModule} from 'primeng/inputtext';
import {CalendarModule} from 'primeng/calendar';
import {ButtonModule} from 'primeng/button';
import { VerifyRoutingModule } from './verify-routing.module';

@NgModule({
  declarations: [RegisterComponent],
  imports: [
    CommonModule,
    VerifyRoutingModule,
    ButtonModule,
    HttpClientModule,
    ReactiveFormsModule,
    InputTextModule,
    CalendarModule
  ],
  providers: [AuthService]
})
export class AuthModule {}
