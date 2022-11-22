import { HttpClient } from '@angular/common/http';
import { gameRegistration, reviewRegistration } from '@game-critics/api-interfaces';
import { Injectable } from '@angular/core';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { environment } from 'apps/game-critics/src/environments/environment';
import { CrudService } from '../../shared/crud.service';

@Injectable({
  providedIn: 'root'
})
export class GameService extends CrudService<gameRegistration, string> {
  baseURI = '';
  constructor(protected override _http: HttpClient) {
    super(_http, `${environment.api.baseURL}/game`)
    this.baseURI = environment.api.baseURL + '/game';
  }

  addReviewToGame(gameId: string, review: reviewRegistration) {
    return this._http.post<reviewRegistration>(this.baseURI + '/' + gameId + '/review', review);
  }
}
