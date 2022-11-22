import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'game-critics-create-review',
  templateUrl: './create-review.component.html',
  styleUrls: ['./create-review.component.css'],
})
export class CreateReviewComponent implements OnInit {
  @Input() game: string | null | undefined;
  constructor() {}

  ngOnInit(): void {
    
  }
}
