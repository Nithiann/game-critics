import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { gameRegistration } from '@game-critics/api-interfaces';
import { GameService } from '../game.service';

@Component({
  selector: 'game-critics-game-registration',
  templateUrl: './game-registration.component.html',
  styleUrls: ['./game-registration.component.css'],
})
export class GameRegistrationComponent implements OnInit {
  id!: string;
  game!: gameRegistration;
  registerForm = new FormGroup({
    id: new FormControl(),
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    image: new FormControl('', [Validators.required]),
    genre: new FormControl([''], [Validators.required]),
    score: new FormControl(0, [Validators.required])
  });
  constructor(private service: GameService, private route: ActivatedRoute) {}

    // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method, @typescript-eslint/no-empty-function
    ngOnInit(): void {
      this.route.paramMap.subscribe((params: ParamMap) => {
        if (params.get('id') !== undefined) {
          this.id = params.get('id') as string;
        }
      })
      if (this.id !== null) {
        this.service.findOne(this.id)
        .subscribe((res) => {
          this.game = res;
          this.registerForm.patchValue(this.game);
        })
      }
    }

    onSubmit(game: gameRegistration) {
      this.service.add(game)
        .subscribe((res) => {
          console.log(res);
        })
    }
}
