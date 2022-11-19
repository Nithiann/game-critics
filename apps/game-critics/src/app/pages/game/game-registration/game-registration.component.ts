import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { gameRegistration } from '@game-critics/api-interfaces';
import { GameService } from '../game.service';

@Component({
  selector: 'game-critics-game-registration',
  templateUrl: './game-registration.component.html',
  styleUrls: ['./game-registration.component.css'],
})
export class GameRegistrationComponent implements OnInit {
  registerForm = new FormGroup({
    id: new FormControl(null),
    title: new FormControl(''),
    description: new FormControl(''),
    image: new FormControl(''),
    genre: new FormControl(['']),
    score: new FormControl(0)
  })
  constructor(private service: GameService) {}

    // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method, @typescript-eslint/no-empty-function
    ngOnInit(): void {}

    onSubmit(game: gameRegistration) {
      this.service.add(game)
        .subscribe((res) => {
          console.log(res);
        })
    }
}
