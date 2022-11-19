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
import { GameDetailComponent } from './game-detail/game-detail.component';
import {ImageModule} from 'primeng/image';

@NgModule({
  declarations: [
    GamesOverviewComponent,
    GameRegistrationComponent,
    GameDetailComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    GamesRoutingModule,
    TableModule,
    ButtonModule,
    ReactiveFormsModule,
    ImageModule
  ],
  providers: [GameService],
})
export class GamesModule {}
