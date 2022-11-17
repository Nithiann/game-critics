import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { UserService } from '../user.service';
import { userRegistration } from '@game-critics/api-interfaces';

@Component({
  selector: 'game-critics-user-overview',
  templateUrl: './user-overview.component.html',
  styleUrls: ['./user-overview.component.css'],
})
export class UserOverviewComponent implements OnInit {
  users: userRegistration[] = [];
  constructor(protected userService: UserService) {
  }

  ngOnInit(): void {
    this.userService.findAll().subscribe((res) => {
      this.users = res;
    })
  }
}
