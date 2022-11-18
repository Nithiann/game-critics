import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { userRegistration } from '@game-critics/api-interfaces';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { environment } from 'apps/game-critics/src/environments/environment';
import { CrudService } from '../../shared/crud.service';

@Injectable({
  providedIn: 'root'
})
export class UserService extends CrudService<userRegistration, string> {

  constructor(protected override _http: HttpClient) {
    super(_http, `${environment.api.baseURL}/user`)
  }
}
