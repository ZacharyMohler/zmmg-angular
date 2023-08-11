import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { BooksEntry } from '../books-list/books-list.component'
import { BooksDataService } from '../books-data.service';

@Component({
  selector: 'app-book-edit',
  templateUrl: './book-edit.component.html',
})
export class BookEditComponent implements OnInit
{

  public formError: string = '';
  public formSuccess: string = '';
  public formWarning: string = '';
  public warned: boolean = false;
  public updating: boolean = false;
  public id: string;

  public requiredFields: BooksEntry = {
    _id: '',
    title: '',
    author: '',
    year: 0,
    comments: ''
  };

  constructor(
    private activatedRoute: ActivatedRoute,
    private booksDataService: BooksDataService
  ) { }

  ngOnInit()
  {
    //for update
    if (this.activatedRoute.snapshot.paramMap.get('id'))
    {
      this.updating = true;
      this.id = this.activatedRoute.snapshot.paramMap.get('id');
      this.booksDataService.getBookById(this.id).then(foundBook => this.requiredFields = foundBook);
    }
  }

  //form update submit
  public onFormSubmit(): void
  {

    this.formError = '';
    if (!this.requiredFields.title || !this.requiredFields.author)
    {
      this.formError = 'Title and Author required!!!';
    } else
    {
      //for updating
      if (this.updating)
      {
        this.sendUpdate();
      }

      //for creating new entry
      else
      {
        this.sendCreate();
      }
    }
  }

  //form delete submit
  public onDeleteSubmit(): void
  {
    if (this.warned)
    {
      this.sendDelete();
    }

    //for creating new entry
    else
    {
      this.formWarning = 'Are you sure you want to delete entry?? click delete again to confirm...'
      this.warned = true;
    }
  }

  //send update to data service
  private sendUpdate(): void
  {
    this.booksDataService.updateBook(this.requiredFields, this.id)
      .then(() => this.formSuccess = 'Updated Successfully!')
      .catch((message) =>
      {
        this.formError = message
      });
  }

  //send create to data service
  private sendCreate(): void
  {
    this.booksDataService.createBook(this.requiredFields)
      .then(() => this.formSuccess = 'Created Successfully!')
      .catch((message) =>
      {
        this.formError = message
      });
  }

  //send delete to data service
  private sendDelete(): void
  {
    this.booksDataService.deleteMovie(this.id)
      .then(() => this.formSuccess = 'Deleted Successfully!')
      .catch((message) =>
      {
        this.formError = message
      });
  }
}
