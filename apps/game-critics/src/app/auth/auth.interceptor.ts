import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private auth: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log("auth interceptor");
    const authToken = this.auth.getAuthToken();

    const authReq = request.clone({
      setHeaders: { Authorization: 'Bearer ' + authToken }
    });

    return next.handle(authReq);
  }
}
