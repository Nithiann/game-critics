import { HttpClient } from '@angular/common/http';
import { gameRegistration } from '@game-critics/api-interfaces';
import { Injectable } from '@angular/core';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { environment } from 'apps/game-critics/src/environments/environment';
import { CrudService } from '../../shared/crud.service';

@Injectable({
  providedIn: 'root'
})
export class GameService extends CrudService<gameRegistration, string> {
  constructor(protected override _http: HttpClient) {
    super(_http, `${environment.api.baseURL}/game`)
  }
}
