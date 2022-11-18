import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { userRegistration } from '@game-critics/api-interfaces';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseURL: string;
  constructor(protected _http: HttpClient) {
    this.baseURL = environment.api.baseURL + '/user';
  }

  register(user: userRegistration): Observable<userRegistration> {
    return this._http.post<userRegistration>(this.baseURL + '/register', user);
  }
}
