import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { BooksEntry } from './books-list/books-list.component';
import { AuthResponse } from './authresponse';
import { BROWSER_STORAGE } from './storage';

@Injectable({
  providedIn: 'root'
})
export class BooksDataService {

//            CONSTRUCTOR
  constructor(private http: HttpClient, @Inject(BROWSER_STORAGE) private storage: Storage)
  {

  }
//            BOTTOM TEXT
  private apiBaseUrl = 'https://fast-savannah-97260.herokuapp.com/api';

  //get music from api based on the toSearch request url query parameter
  public getBooksSearch(toSearch: string): Promise<BooksEntry[]>
  {
    const url: string = `${this.apiBaseUrl}/booksEntriesSearch/${toSearch}`
    return this.http
      .get(url)
      .toPromise()
      .then(response => response as BooksEntry[])
      .catch(this.handleError);
  }

  //get books from api based on the year request url parameter
  public getBooksYear(year: string): Promise<BooksEntry[]>
  {
    let url: string;

    //all formats button case
    if (year == "All Books")
    {
      url = `${this.apiBaseUrl}/booksEntries`
    }

    else if (year == "< 1900")
    {
      url = `${this.apiBaseUrl}/books/olderthan1900`
    }

    else if (year == "1900 - 1949")
    {
      url = `${this.apiBaseUrl}/books/olderthan1950`
    }

    else if (year == "1950 - 1999")
    {
      url = `${this.apiBaseUrl}/books/olderthan2000`
    }

    else if (year == "> 2000")
    {
      url = `${this.apiBaseUrl}/books/newerthan2000`
    }

    return this.http
      .get(url)
      .toPromise()
      .then(response => response as BooksEntry[])
      .catch(this.handleError);
  }

  //get all books from api
  public getBooks(): Promise<BooksEntry[]>
  {
    const url: string = `${this.apiBaseUrl}/booksEntries`
    return this.http
      .get(url)
      .toPromise()
      .then(response => response as BooksEntry[])
      .catch(this.handleError);
  }

  //push an update
  public updateBook(params: BooksEntry, bookId: string): Promise<BooksEntry>
  {
    const url: string = `${this.apiBaseUrl}/booksEntries/${bookId}`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.storage.getItem('zmmg-token')}`
      })
    };
    return this.http
      .put(url, params, httpOptions)
      .toPromise()
      .then(response => response as BooksEntry)
      .catch(this.handleError);
  }

  //get one movie by ID
  public getBookById(bookId: string): Promise<BooksEntry>
  {
    const url: string = `${this.apiBaseUrl}/booksEntries/${bookId}`
    return this.http
      .get(url)
      .toPromise()
      .then(response => response as BooksEntry)
      .catch(this.handleError);
  }

  //push an new entry
  public createBook(params: BooksEntry): Promise<BooksEntry>
  {
    const url: string = `${this.apiBaseUrl}/booksEntries`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.storage.getItem('zmmg-token')}`
      })
    };
    return this.http
      .post(url, params, httpOptions)
      .toPromise()
      .then(response => response as BooksEntry)
      .catch(this.handleError);
  }

  //delete one movie by ID
  public deleteMovie(booksId: string): Promise<BooksEntry>
  {
    const url: string = `${this.apiBaseUrl}/booksEntries/${booksId}`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.storage.getItem('zmmg-token')}`
      })
    };
    return this.http
      .delete(url, httpOptions)
      .toPromise()
      .then(response => response as BooksEntry)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any>
  {
    console.error('Something has gone wrong', error);
    return Promise.reject(error.message || error);
  }
}
