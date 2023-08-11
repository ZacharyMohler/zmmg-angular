import { Component, OnInit } from '@angular/core';
import { BooksDataService } from '../books-data.service';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../authentication.service';

export class BooksEntry
{
  _id: string;
  title: string;
  author: string;
  year: number;
  comments: string;
}
@Component({
  selector: 'app-books-list',
  templateUrl: '/books-list.component.html',
  styles: []
})

export class BooksListComponent implements OnInit
{
  toSearch: string;
  constructor(private route: ActivatedRoute, private booksDataService: BooksDataService, private authenticationService: AuthenticationService) { }

  private booksList: BooksEntry[];

  private getBooks(): void
  {
    this.booksDataService
      .getBooks()
      .then(foundBooks => this.booksList = foundBooks);
  }

  private getBooksSearch(toSearch: string): void
  {
    this.booksDataService
      .getBooksSearch(toSearch)
      .then(foundBooks => this.booksList = foundBooks);
  }

  private getBooksYear(year: string): void
  {
    this.booksDataService
      .getBooksYear(year)
      .then(foundBooks => this.booksList = foundBooks);
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
      this.getBooksSearch(this.toSearch);
    }

    //if format is present in req params, get based on format
    else if (this.route.snapshot.paramMap.get('year'))
    {
      this.getBooksYear(this.route.snapshot.paramMap.get('year'));
    }

    //otherwise get all
    else
    {
      this.getBooks();
    }

  }

}
