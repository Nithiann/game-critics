import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { GamesOverviewComponent } from './games-overview/games-overview.component'

const routes: Routes = [
  {
    path: '', pathMatch: 'full', component: GamesOverviewComponent
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GamesRoutingModule {}
