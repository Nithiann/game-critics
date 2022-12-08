import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { credentialsForm, userInfo, userRegistration, verification } from '@game-critics/api-interfaces';
import { Observable } from 'rxjs/internal/Observable';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from '../../environments/environment';
import { BehaviorSubject, catchError, map, of, switchMap } from 'rxjs';
import { Router } from '@angular/router';
import { AlertService } from '../shared/alert.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public currentUser$ = new BehaviorSubject<userInfo | undefined>(undefined);
  private readonly CURRENT_USER = 'currentuser';
  private readonly headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  baseURL: string;
  constructor(
    protected _http: HttpClient,
    protected jwtHelper: JwtHelperService,
    private alert: AlertService,
    private router: Router
  ) {
    this.baseURL = environment.api.baseURL + '/user';
    this.getUserFromLocalStorage()
      .pipe(
        // switchMap is overbodig als we validateToken() niet gebruiken...
        switchMap((user: userInfo | undefined) => {
          if (user) {
            console.log('User found in local storage');
            this.currentUser$.next(user);
            // return this.validateToken(user);
            return of(user);
          } else {
            console.log(`No current user found`);
            return of(undefined);
          }
        })
      )
      .subscribe(() => console.log('Startup auth done'));
  }

  login(user: credentialsForm): Observable<verification | undefined> {

    return this._http
      .post<verification>(
        this.baseURL + '/login',
        user,
        {
          headers: this.headers,
        }
      )
      .pipe(
        map((resp: any) => resp),
        map((data: userInfo) => {
          console.log(data);
          this.saveUserToLocalStorage(data);
          this.currentUser$.next(data);
          this.alert.success('You have been logged in');
          return data;
        }),
        catchError((error) => {
          console.log('error:', error);
          console.log('error.message:', error.message);
          console.log('error.error.message:', error.error.message);
          this.alert.error(error.error.message || error.message);
          return of(undefined);
        })
      );
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

  logout(): void {
    this.router
      .navigate(['/'])
      .then((success) => {
        // true when canDeactivate allows us to leave the page.
        if (success) {
          console.log('logout - removing local user info');
          localStorage.removeItem(this.CURRENT_USER);
          this.currentUser$.next(undefined);
          this.alert.success('You have been logged out.');
        } else {
          console.log('navigate result:', success);
        }
      })
      .catch((error) => console.log('not logged out!'));
  }

  getUserFromLocalStorage(): Observable<userInfo | undefined> {
    const userData = localStorage.getItem(this.CURRENT_USER);
    if (userData) {
      const localUser = JSON.parse(userData);
      return of(localUser);
    } else {
      return of(undefined);
    }
  }

  private saveUserToLocalStorage(user: userInfo): void {
    localStorage.setItem(this.CURRENT_USER, JSON.stringify(user));
  }

}
