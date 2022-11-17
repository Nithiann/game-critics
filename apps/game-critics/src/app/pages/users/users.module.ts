import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { UserOverviewComponent } from './user-overview/user-overview.component';
import { UserRegistrationComponent } from './user-registration/user-registration.component';
import { UserRoutingModule } from './user-routing.module';
import {TableModule} from 'primeng/table';
import {ButtonModule} from 'primeng/button';

@NgModule({
  declarations: [
    UserOverviewComponent,
    UserRegistrationComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    UserRoutingModule,
    TableModule,
    ButtonModule
  ],
})
export class UsersModule {}
