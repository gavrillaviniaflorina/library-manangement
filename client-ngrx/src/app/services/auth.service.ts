import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import * as AuthAction from '../components/user/store/auth.actions'
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Login } from '../components/login/login.model';
import { LoginResponse } from '../components/user/store/authResponseData';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private server = environment.apiUrl+"/api/v1";
  private tokenExpirationTimer: any;

  constructor(
    private http:HttpClient,
    private store: Store<fromApp.AppState>
  ) {}

  login(user:Login):Observable<LoginResponse>{
    return this.http.post<LoginResponse>(this.server+"/user/login", user);
  }


  setLogoutTimer(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.store.dispatch(new AuthAction.Logout());
    }, expirationDuration);
  }

  clearLogoutTimer() {
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
      this.tokenExpirationTimer = null;
    }
  }
}
