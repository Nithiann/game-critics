import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { GameDetailComponent } from './game-detail/game-detail.component'
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
  },
  {
    path: ':id',
    component: GameDetailComponent
  },
  {
    path: 'update/:id',
    pathMatch: 'prefix',
    component: GameRegistrationComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GamesRoutingModule {}
