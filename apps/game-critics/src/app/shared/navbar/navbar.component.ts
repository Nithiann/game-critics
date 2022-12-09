import { Component, OnInit } from '@angular/core';
import {MenubarModule} from 'primeng/menubar';
import {MenuItem, PrimeIcons} from 'primeng/api';
import { userInfo } from '@game-critics/api-interfaces';
import { Observable } from 'rxjs';
import { AuthService } from '../../auth/auth.service';


@Component({
  selector: 'game-critics-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  menuItems: MenuItem[] = [];
  loggedInUser$!: Observable<userInfo | undefined>;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.loggedInUser$ = this.authService.currentUser$;
    this.menuItems = [
      {
        label: 'Home',
        icon: 'pi pi-fw pi-home',
        routerLink: '/'
      },
      {
        label: 'Users',
        icon: 'pi pi-fw pi-users',
        items: [
          {
            label: 'New',
            icon: 'pi pi-fw pi-user-plus',
            routerLink: '/verify/register'
          },
          {
            label: 'Overview',
            icon: 'pi pi-fw pi-table',
            routerLink: '/users'
          }
        ]
      },
      {
        label: 'Games',
        items: [
          {
            label: 'New',
            icon: 'pi pi-fw pi-plus',
            routerLink: '/games/new'
          },
          {
            label: 'Overview',
            icon: 'pi pi-fw pi-table',
            routerLink: '/games'
          },
          {
            label: 'admin',
            icon: 'pi pi-fw pi-table',
            routerLink: '/games/admin'
          }
        ]
      },
      {
        label: 'About',
        icon: 'pi pi-fw pi-info',
        routerLink: '/about'
      }
    ]
  }

  logout(): void {
    this.authService.logout();
  }
}
