import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './pages/about/about.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'dashboard'},
  { path: 'dashboard', pathMatch: 'full', component: DashboardComponent},
  { path: 'about', pathMatch: 'full', component: AboutComponent},
  {
    path: 'users',
    loadChildren: () =>
      import('./pages/users/users.module')
      .then(
        (m) => m.UsersModule,
        () => {
          throw {loadChunkError: true}
        }
      )
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
