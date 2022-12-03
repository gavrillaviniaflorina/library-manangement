import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookDetailsComponent } from './components/book-details/book-details.component';
import { UpdateBook } from './components/book/store/book-list.action';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NewBookComponent } from './components/new-book/new-book.component';

const routes: Routes = [
  {path:'', redirectTo:'/login',pathMatch:'full'},
  {path:'login',component:LoginComponent},
  { path: 'books', component: HomeComponent},
  {path: 'books/new', component: NewBookComponent},
  {path: 'books/:id', component: BookDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


