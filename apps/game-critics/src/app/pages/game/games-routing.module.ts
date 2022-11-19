import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { GameRegistrationComponent } from './game-registration/game-registration.component'
import { GamesOverviewComponent } from './games-overview/games-overview.component'

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: GamesOverviewComponent
  },
  {
    path: 'new',
    pathMatch: 'full',
    component: GameRegistrationComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GamesRoutingModule {}
