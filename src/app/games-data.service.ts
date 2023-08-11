import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { GamesEntry } from './games-list/games-list.component';
import { AuthResponse } from './authresponse';
import { BROWSER_STORAGE } from './storage';

@Injectable({
  providedIn: 'root'
})
export class GamesDataService {

//            CONSTRUCTOR
  constructor(private http: HttpClient, @Inject(BROWSER_STORAGE) private storage: Storage)
  {

  }
//            BOTTOM TEXT
  private apiBaseUrl = 'http://localhost:3000/api';

  //get games from api based on the toSearch request url query parameter
  public getGamesSearch(toSearch: string): Promise<GamesEntry[]>
  {
    const url: string = `${this.apiBaseUrl}/gamesEntriesSearch/${toSearch}`
    return this.http
      .get(url)
      .toPromise()
      .then(response => response as GamesEntry[])
      .catch(this.handleError);
  }

  //get games from api based on the format request url parameter
  public getGamesPlatform(platform: string): Promise<GamesEntry[]>
  {
    let url: string;

    //all formats button case
    if (platform == "All Consoles")
    {
      url = `${this.apiBaseUrl}/gamesEntries`
    }

    else
    {
      url = `${this.apiBaseUrl}/gamesEntriesPlatform/${platform}`
    }

    return this.http
      .get(url)
      .toPromise()
      .then(response => response as GamesEntry[])
      .catch(this.handleError);
  }

  //get all games from api
  public getGames(): Promise<GamesEntry[]>
  {
    const url: string = `${this.apiBaseUrl}/gamesEntries`
    return this.http
      .get(url)
      .toPromise()
      .then(response => response as GamesEntry[])
      .catch(this.handleError);
  }

  //push an update
  public updateGame(params: GamesEntry, gameId: string): Promise<GamesEntry>
  {
    const url: string = `${this.apiBaseUrl}/gamesEntries/${gameId}`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.storage.getItem('zmmg-token')}`
      })
    };
    return this.http
      .put(url, params, httpOptions)
      .toPromise()
      .then(response => response as GamesEntry)
      .catch(this.handleError);
  }

  //get one game by ID
  public getGameById(gameId: string): Promise<GamesEntry>
  {
    const url: string = `${this.apiBaseUrl}/gamesEntries/${gameId}`
    return this.http
      .get(url)
      .toPromise()
      .then(response => response as GamesEntry)
      .catch(this.handleError);
  }

  //push an new entry
  public createGame(params: GamesEntry): Promise<GamesEntry>
  {
    const url: string = `${this.apiBaseUrl}/gamesEntries`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.storage.getItem('zmmg-token')}`
      })
    };
    return this.http
      .post(url, params, httpOptions)
      .toPromise()
      .then(response => response as GamesEntry)
      .catch(this.handleError);
  }

  //delete one game by ID
  public deleteGame(gameId: string): Promise<GamesEntry>
  {
    const url: string = `${this.apiBaseUrl}/gamesEntries/${gameId}`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.storage.getItem('zmmg-token')}`
      })
    };
    return this.http
      .delete(url, httpOptions)
      .toPromise()
      .then(response => response as GamesEntry)
      .catch(this.handleError);
  }
  private handleError(error: any): Promise<any>
  {
    console.error('Something has gone wrong', error);
    return Promise.reject(error.message || error);
  }
}
