import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpInterceptor,

} from '@angular/common/http';
import { exhaustMap, take, map } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import * as fromApp from '../../store/app.reducer';
import { Store } from '@ngrx/store';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private authService: AuthService, private store: Store<fromApp.AppState>) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return this.store.select('user').pipe(
      take(1),
      map(authState => {
        return authState.user;
      }),
      exhaustMap(user => {
        if (!user) {
          return next.handle(req);
        }
        const httpRequest=req.clone({
          setHeaders:{Authorization: `Bearer ${user.token}`}
        });        
        return next.handle(httpRequest);
      })
    );
  }
}
