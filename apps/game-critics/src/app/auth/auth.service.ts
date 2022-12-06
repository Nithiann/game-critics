import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { credentialsForm, userRegistration } from '@game-critics/api-interfaces';
import { Observable } from 'rxjs/internal/Observable';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseURL: string;
  constructor(protected _http: HttpClient, protected jwtHelper: JwtHelperService) {
    this.baseURL = environment.api.baseURL + '/user';
  }

  login(user: credentialsForm): Observable<credentialsForm> {
    return this._http.post<credentialsForm>(this.baseURL + '/login', user);
  }

  register(user: userRegistration): Observable<userRegistration> {
    return this._http.post<userRegistration>(this.baseURL + '/register', user);
  }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token') || undefined;
    // Check whether the token is expired and return
    // true or false
    return !this.jwtHelper.isTokenExpired(token);
  }
}
