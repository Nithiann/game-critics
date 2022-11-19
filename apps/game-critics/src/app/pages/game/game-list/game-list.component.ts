import { Component, OnInit } from '@angular/core';
import { gameRegistration } from '@game-critics/api-interfaces';
import { GameService } from '../game.service';

@Component({
  selector: 'game-critics-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.css'],
})
export class GameListComponent implements OnInit {
  games: gameRegistration[] = []
  constructor(private service: GameService) {}

  ngOnInit(): void {
    this.service.findAll().subscribe((res) => {
      this.games = res;
    })
  }
}
