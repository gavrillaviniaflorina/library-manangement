import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as AuthActions from '../app/components/user/store/auth.actions'
import * as fromApp from '../app/store/app.reducer'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'client-ngrx';

  @HostListener("window:beforeunload", ["$event"]) unloadHandler(event: Event) {
    console.log("Processing beforeunload...");
    this.refresh();
  }

  public constructor(private router:Router, private store: Store<fromApp.AppState>){
  }

  private refresh(){
    this.store.dispatch(
      new AuthActions.AutoLogin()
    )
  }
}
