import { Component, OnInit } from '@angular/core';
import {MenubarModule} from 'primeng/menubar';
import {MenuItem, PrimeIcons} from 'primeng/api';


@Component({
  selector: 'game-critics-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  menuItems: MenuItem[] = [];

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  ngOnInit(): void {
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
            icon: 'pi pi-fw pi-plus'
          },
          {
            label: 'Overview',
            icon: 'pi pi-fw pi-table'
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
}
