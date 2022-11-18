import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { UserOverviewComponent } from './user-overview/user-overview.component';
import { UserRoutingModule } from './user-routing.module';
import {TableModule} from 'primeng/table';
import {ButtonModule} from 'primeng/button';
import { UserService } from './user.service';
import { AuthService } from '../../auth/auth.service';

@NgModule({
  declarations: [
    UserOverviewComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    UserRoutingModule,
    TableModule,
    ButtonModule
  ],
  providers: [UserService, AuthService]
})
export class UsersModule {}
