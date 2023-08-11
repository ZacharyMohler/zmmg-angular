import { Component, OnInit } from '@angular/core';
import { MoviesDataService } from '../movies-data.service';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../authentication.service';

export class MoviesEntry
{
  _id: string;
  title: string;
  format: string;
  type: string;
  comments: string;
}
@Component({
  selector: 'app-movies-list',
  templateUrl: '/movies-list.component.html',
  styles: []
})

export class MoviesListComponent implements OnInit
{
  toSearch: string;
  constructor(private route: ActivatedRoute, private moviesDataService: MoviesDataService, private authenticationService: AuthenticationService) { }

  private moviesList: MoviesEntry[];

  private getMovies(): void
  {
    this.moviesDataService
      .getMovies()
      .then(foundMovies => this.moviesList = foundMovies);
  }

  private getMoviesSearch(toSearch: string): void
  {
    this.moviesDataService
      .getMoviesSearch(toSearch)
      .then(foundMovies => this.moviesList = foundMovies);
  }

  private getMoviesFormat(format: string): void
  {
    this.moviesDataService
      .getMoviesFormat(format)
      .then(foundMovies => this.moviesList = foundMovies);
  }

  public isLoggedIn(): boolean
  {
    return this.authenticationService.isLoggedIn();
  }


  ngOnInit()
  {
    //if there is a query get entries from API based on query 
    if (this.route.snapshot.queryParamMap.get('toSearch'))
    {
      this.toSearch = this.route.snapshot.queryParamMap.get('toSearch');
      this.getMoviesSearch(this.toSearch);
    }

    //if format is present in req params, get based on format
    else if (this.route.snapshot.paramMap.get('format'))
    {
      this.getMoviesFormat(this.route.snapshot.paramMap.get('format'));
    }

    //otherwise get all
    else
    {
      this.getMovies();
    }

  }

}
