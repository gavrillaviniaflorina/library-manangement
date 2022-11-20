import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule, HTTP_INTERCEPTORS} from "@angular/common/http";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BookComponent } from './components/book/book.component';
import { HomeComponent } from './components/home/home.component';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import * as fromApp from './store/app.reducer';
import { EffectsModule } from '@ngrx/effects';
import { BooksEffects } from './components/book/store/book-list.effects';
import { NewBookComponent } from './components/new-book/new-book.component';
import { ToastrModule } from 'ngx-toastr';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { BookDetailsComponent } from './components/book-details/book-details.component';
import { UserComponent } from './components/user/user.component';
import { LoginComponent } from './components/login/login.component';
import { AuthEffects } from './components/user/store/auth.effects';
import {AuthInterceptorService} from './components/user/auth.interceptor'
import { AuthService } from './services/auth.service';

@NgModule({
  declarations: [
    AppComponent,
    BookComponent,
    HomeComponent,
    NewBookComponent,
    BookDetailsComponent,
    UserComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot(fromApp.appReducer),
    StoreDevtoolsModule.instrument({ logOnly: environment.production }),
    EffectsModule.forRoot([BooksEffects, AuthEffects]),
    StoreRouterConnectingModule.forRoot(),
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
  ],
  providers: [ AuthService,
  {provide: HTTP_INTERCEPTORS, useClass:AuthInterceptorService, multi:true}   ],
  bootstrap: [AppComponent]
})
export class AppModule { }
