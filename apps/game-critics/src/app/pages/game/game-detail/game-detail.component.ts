import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { gameRegistration } from '@game-critics/api-interfaces';
import { GameService } from '../game.service';

@Component({
  selector: 'game-critics-game-detail',
  templateUrl: './game-detail.component.html',
  styleUrls: ['./game-detail.component.css'],
})
export class GameDetailComponent implements OnInit {
  game!: gameRegistration;
  id!: string;
  constructor(private service: GameService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = params.get('id') as string;
    });
    this.service.findOne(this.id)
    .subscribe((res) => {
      this.game = res;
    })
  }
}
