import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './pages/about/about.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
  { path: 'dashboard', pathMatch: 'full', component: DashboardComponent },
  { path: 'about', pathMatch: 'full', component: AboutComponent },
  {
    path: 'users',
    loadChildren: () =>
      import('./pages/users/users.module').then(
        (m) => m.UsersModule,
        () => {
          throw { loadChunkError: true };
        }
      ),
  },
  {
    path: 'games',
    loadChildren: () =>
      import('./pages/game/game.module')
      .then((m) => m.GamesModule)
  },
  {
    path: 'verify',
    loadChildren: () =>
      import('./auth/auth.module')
      .then((m) => m.AuthModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
