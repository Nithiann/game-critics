import { Component, OnInit } from '@angular/core';
import { gameRegistration } from '@game-critics/api-interfaces';
import { GameService } from '../game.service';

@Component({
  selector: 'game-critics-games-overview',
  templateUrl: './games-overview.component.html',
  styleUrls: ['./games-overview.component.css'],
})
export class GamesOverviewComponent implements OnInit {
  games: gameRegistration[] = []
  constructor(private service: GameService) {}

  ngOnInit(): void {
    this.service.findAll().subscribe((res) => {
      this.games = res;
    })
  }

  handleDelete(id: string, game: gameRegistration) {
    this.service.delete(id)
      .subscribe((res) => {
        const index = this.games.indexOf(game);
        if (index !== -1)
          this.games.splice(index, 1);
      });
  }
}
