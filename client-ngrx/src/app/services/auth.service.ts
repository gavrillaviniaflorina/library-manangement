import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import * as AuthAction from '../components/user/store/auth.actions'
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Login } from '../components/login/login.model';
import { LoginResponse, RegisterResponse } from '../components/user/store/authResponseData';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private server = environment.apiUrl;
  private tokenExpirationTimer: any;

  constructor(
    private http:HttpClient,
    private store: Store<fromApp.AppState>
  ) {}

  login(user:Login):Observable<LoginResponse>{
    return this.http.post<LoginResponse>(this.server+"/user/login", user);
  }


  signUp(user:Login):Observable<RegisterResponse>{
    return this.http.post<RegisterResponse>(this.server+"/user/register", user);
  }
}
