import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { GamesRoutingModule } from './games-routing.module';
import { GamesOverviewComponent } from './games-overview/games-overview.component';
import { GameService } from './game.service';

@NgModule({
  declarations: [GamesOverviewComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    GamesRoutingModule,
    TableModule,
    ButtonModule,
  ],
  providers: [GameService]
})
export class GamesModule {}
