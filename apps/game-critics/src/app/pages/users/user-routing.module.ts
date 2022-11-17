import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { UserOverviewComponent } from './user-overview/user-overview.component'
import { UserRegistrationComponent } from './user-registration/user-registration.component'

const routes: Routes = [
  {
    path: '', pathMatch: 'full', component: UserOverviewComponent
  },
  {
    path: 'new', pathMatch: 'full', component: UserRegistrationComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {}
