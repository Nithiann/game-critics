import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { GamesRoutingModule } from './games-routing.module';
import { GamesOverviewComponent } from './games-overview/games-overview.component';
import { GameService } from './game.service';
import { GameRegistrationComponent } from './game-registration/game-registration.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [GamesOverviewComponent, GameRegistrationComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    GamesRoutingModule,
    TableModule,
    ButtonModule,
    ReactiveFormsModule
  ],
  providers: [GameService],
})
export class GamesModule {}
