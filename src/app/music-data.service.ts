import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { MusicEntry } from './music-list/music-list.component';
import { AuthResponse } from './authresponse';
import { BROWSER_STORAGE } from './storage';

@Injectable({
  providedIn: 'root'
})
export class MusicDataService {

//            CONSTRUCTOR
  constructor(private http: HttpClient, @Inject(BROWSER_STORAGE) private storage: Storage)
  {

  }
//            BOTTOM TEXT
  private apiBaseUrl = 'http://localhost:3000/api';

  //get music from api based on the toSearch request url query parameter
  public getMusicSearch(toSearch: string): Promise<MusicEntry[]>
  {
    const url: string = `${this.apiBaseUrl}/musicEntriesSearch/${toSearch}`
    return this.http
      .get(url)
      .toPromise()
      .then(response => response as MusicEntry[])
      .catch(this.handleError);
  }

  //get music from api based on the format request url parameter
  public getMusicFormat(format: string): Promise<MusicEntry[]>
  {
    let url: string;

    //all formats button case
    if (format == "All Formats")
    {
      url = `${this.apiBaseUrl}/musicEntries`
    }

    else
    {
      url = `${this.apiBaseUrl}/musicEntriesFormat/${format}`
    }

    return this.http
      .get(url)
      .toPromise()
      .then(response => response as MusicEntry[])
      .catch(this.handleError);
  }

  //get all music from api
  public getMusic(): Promise<MusicEntry[]>
  {
    const url: string = `${this.apiBaseUrl}/musicEntries`
    return this.http
      .get(url)
      .toPromise()
      .then(response => response as MusicEntry[])
      .catch(this.handleError);
  }

  //push an update
  public updateMusic(params: MusicEntry, musicId: string): Promise<MusicEntry>
  {
    const url: string = `${this.apiBaseUrl}/musicEntries/${musicId}`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.storage.getItem('zmmg-token')}`
      })
    };
    return this.http
      .put(url, params, httpOptions)
      .toPromise()
      .then(response => response as MusicEntry)
      .catch(this.handleError);
  }

  //get one music by ID
  public getMusicById(musicId: string): Promise<MusicEntry>
  {
    const url: string = `${this.apiBaseUrl}/musicEntries/${musicId}`
    return this.http
      .get(url)
      .toPromise()
      .then(response => response as MusicEntry)
      .catch(this.handleError);
  }

  //push an new entry
  public createMusic(params: MusicEntry): Promise<MusicEntry>
  {
    const url: string = `${this.apiBaseUrl}/musicEntries`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.storage.getItem('zmmg-token')}`
      })
    };
    return this.http
      .post(url, params, httpOptions)
      .toPromise()
      .then(response => response as MusicEntry)
      .catch(this.handleError);
  }

  //delete one music by ID
  public deleteMusic(musicId: string): Promise<MusicEntry>
  {
    const url: string = `${this.apiBaseUrl}/musicEntries/${musicId}`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.storage.getItem('zmmg-token')}`
      })
    };
    return this.http
      .delete(url, httpOptions)
      .toPromise()
      .then(response => response as MusicEntry)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any>
  {
    console.error('Something has gone wrong', error);
    return Promise.reject(error.message || error);
  }
}
