import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { reviewRegistration } from '@game-critics/api-interfaces';

@Component({
  selector: 'game-critics-create-review',
  templateUrl: './create-review.component.html',
  styleUrls: ['./create-review.component.css'],
})
export class CreateReviewComponent  {
  @Input() game: string | null | undefined;
  // TODO: get user from token
  reviewForm = new FormGroup({
    user_ref: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    game_score: new FormControl(0, [Validators.required, Validators.nullValidator])
  });

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor(){}


  onSubmit(review: reviewRegistration) {
    console.log(review);
  }
}
