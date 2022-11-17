import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { UserOverviewComponent } from './user-overview/user-overview.component';
import { UserRegistrationComponent } from './user-registration/user-registration.component';
import { UserRoutingModule } from './user-routing.module';

@NgModule({
  declarations: [
    UserOverviewComponent,
    UserRegistrationComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    UserRoutingModule
  ],
})
export class UsersModule {}
