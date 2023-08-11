import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { MoviesEntry } from './movies-list/movies-list.component';
import { AuthResponse } from './authresponse';
import { BROWSER_STORAGE } from './storage';

@Injectable({
  providedIn: 'root'
})
export class MoviesDataService {

//            CONSTRUCTOR
  constructor(private http: HttpClient, @Inject(BROWSER_STORAGE) private storage: Storage)
  {

  }
//            BOTTOM TEXT
  private apiBaseUrl = 'http://localhost:3000/api';

  //get entry counts from api
  public getCounts(): Promise<number[]>
  {
    const url: string = `${this.apiBaseUrl}/countEntries`
    return this.http
      .get(url)
      .toPromise()
      .then(response => response as number[])
      .catch(this.handleError);

  }

  //get movies from api based on the toSearch request url query parameter
  public getMoviesSearch(toSearch: string): Promise<MoviesEntry[]>
  {
    const url: string = `${this.apiBaseUrl}/moviesEntriesSearch/${toSearch}`
    return this.http
      .get(url)
      .toPromise()
      .then(response => response as MoviesEntry[])
      .catch(this.handleError);
  }

  //get movies from api based on the format request url parameter
  public getMoviesFormat(format: string): Promise<MoviesEntry[]>
  {
    let url: string;

    //all formats button case
    if (format == "All Formats")
    {
      url = `${this.apiBaseUrl}/moviesEntries`
    }

    else
    {
      url = `${this.apiBaseUrl}/moviesEntriesFormat/${format}`
    }

    return this.http
      .get(url)
      .toPromise()
      .then(response => response as MoviesEntry[])
      .catch(this.handleError);
  }

  //get all movies from api
  public getMovies(): Promise<MoviesEntry[]>
  {
    const url: string = `${this.apiBaseUrl}/moviesEntries`
    return this.http
      .get(url)
      .toPromise()
      .then(response => response as MoviesEntry[])
      .catch(this.handleError);
  }

  //push an update
  public updateMovie(params: MoviesEntry, movieId: string): Promise<MoviesEntry>
  {
    const url: string = `${this.apiBaseUrl}/moviesEntries/${movieId}`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.storage.getItem('zmmg-token')}`
      })
    };
    return this.http
      .put(url, params, httpOptions)
      .toPromise()
      .then(response => response as MoviesEntry)
      .catch(this.handleError);
  }

  //get one movie by ID
  public getMovieById(movieId: string): Promise<MoviesEntry>
  {
    const url: string = `${this.apiBaseUrl}/moviesEntries/${movieId}`
    return this.http
      .get(url)
      .toPromise()
      .then(response => response as MoviesEntry)
      .catch(this.handleError);
  }

  //push an new entry
  public createMovie(params: MoviesEntry): Promise<MoviesEntry>
  {
    const url: string = `${this.apiBaseUrl}/moviesEntries`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.storage.getItem('zmmg-token')}`
      })
    };
    return this.http
      .post(url, params, httpOptions)
      .toPromise()
      .then(response => response as MoviesEntry)
      .catch(this.handleError);
  }

  //delete one movie by ID
  public deleteMovie(movieId: string): Promise<MoviesEntry>
  {
    const url: string = `${this.apiBaseUrl}/moviesEntries/${movieId}`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.storage.getItem('zmmg-token')}`
      })
    };
    return this.http
      .delete(url, httpOptions)
      .toPromise()
      .then(response => response as MoviesEntry)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any>
  {
    console.error('Something has gone wrong', error);
    return Promise.reject(error.message || error);
  }
}
