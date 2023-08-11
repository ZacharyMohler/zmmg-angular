import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HomeListComponent } from './home-list/home-list.component';
import { FrameworkComponent } from './framework/framework.component';
import { RouterModule } from '@angular/router';
import { MoviesListComponent } from './movies-list/movies-list.component';
import { MusicListComponent } from './music-list/music-list.component';
import { GamesListComponent } from './games-list/games-list.component';
import { BooksListComponent } from './books-list/books-list.component';
import { HomepageComponent } from './homepage/homepage.component';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { MovieEditComponent } from './movie-edit/movie-edit.component';
import { MusicEditComponent } from './music-edit/music-edit.component';
import { GameEditComponent } from './game-edit/game-edit.component';
import { BookEditComponent } from './book-edit/book-edit.component';


@NgModule({
  declarations: [
    HomeListComponent,
    FrameworkComponent,
    MoviesListComponent,
    MusicListComponent,
    GamesListComponent,
    BooksListComponent,
    HomepageComponent,
    LoginComponent,
    RegisterComponent,
    MovieEditComponent,
    MusicEditComponent,
    GameEditComponent,
    BookEditComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      {
        path: '',
        component: HomepageComponent
      },
      {
        path: 'collections',
        component: HomeListComponent
      },
      //movies =============================
      {
        path: 'collections/movies',
        component: MoviesListComponent
      },
      {
        path: 'collections/movies/addMovie',
        component: MovieEditComponent
      },
      {
        path: 'collections/movies/:format',
        component: MoviesListComponent
      },
      {
        path: 'collections/movies/search',
        component: MoviesListComponent
      },
      {
        path: 'collections/movies/movieEdit/:id',
        component: MovieEditComponent
      },

      //music ==============================
      {
        path: 'collections/music',
        component: MusicListComponent
      },
      {
        path: 'collections/music/addMusic',
        component: MusicEditComponent
      },
      {
        path: 'collections/music/:format',
        component: MusicListComponent
      },
      {
        path: 'collections/music/search',
        component: MusicListComponent
      },
      {
        path: 'collections/music/musicEdit/:id',
        component: MusicEditComponent
      },
      //games ==============================
      {
        path: 'collections/games',
        component: GamesListComponent
      },
      {
        path: 'collections/games/addGame',
        component: GameEditComponent
      },
      {
        path: 'collections/games/:format',
        component: GamesListComponent
      },
      {
        path: 'collections/games/search',
        component: GamesListComponent
      },
      {
        path: 'collections/games/gameEdit/:id',
        component: GameEditComponent
      },
      //books ==============================
      {
        path: 'collections/books',
        component: BooksListComponent
      },
      {
        path: 'collections/books/addBook',
        component: BookEditComponent
      },
      {
        path: 'collections/books/:year',
        component: BooksListComponent
      },
      {
        path: 'collections/books/bookEdit/:id',
        component: BookEditComponent
      },
      //accounts ==============================
      {
        path: 'login',
        component: LoginComponent
      },
      //{ removed to prevent new account creation
      //  path: 'register',
      //  component: RegisterComponent
      //}

    ])
  ],
  providers: [],
  bootstrap: [FrameworkComponent]
})
export class AppModule { }
