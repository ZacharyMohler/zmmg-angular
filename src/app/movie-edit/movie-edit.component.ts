import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { MoviesEntry } from '../movies-list/movies-list.component'
import { MoviesDataService } from '../movies-data.service';

@Component({
  selector: 'app-movie-edit',
  templateUrl: './movie-edit.component.html',
})
export class MovieEditComponent implements OnInit
{

  public formError: string = '';
  public formSuccess: string = '';
  public formWarning: string = '';
  public warned: boolean = false;
  public updating: boolean = false;
  public id: string;

  public requiredFields: MoviesEntry = {
    _id: '',
    title: '',
    format: '',
    type: '',
    comments: ''
  };

  constructor(
    private activatedRoute: ActivatedRoute,
    private moviesDataService: MoviesDataService
  ) { }

  ngOnInit()
  {
    //for update
    if (this.activatedRoute.snapshot.paramMap.get('id'))
    {
      this.updating = true;
      this.id = this.activatedRoute.snapshot.paramMap.get('id');
      this.moviesDataService.getMovieById(this.id).then(foundMovie => this.requiredFields = foundMovie);
    }

  }

  //form update submit
  public onFormSubmit(): void
  {

    this.formError = '';
    if (!this.requiredFields.title || !this.requiredFields.format)
    {
      this.formError = 'Title and Format required!!!';
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
    this.moviesDataService.updateMovie(this.requiredFields, this.id)
      .then(() => this.formSuccess = 'Updated Successfully!')
      .catch((message) =>
      {
        this.formError = message
      });
  }

  //send create to data service
  private sendCreate(): void
  {
    this.moviesDataService.createMovie(this.requiredFields)
      .then(() => this.formSuccess = 'Created Successfully!')
      .catch((message) =>
      {
        this.formError = message
      });
  }

  //send delete to data service
  private sendDelete(): void
  {
    this.moviesDataService.deleteMovie(this.id)
      .then(() => this.formSuccess = 'Deleted Successfully!')
      .catch((message) =>
      {
        this.formError = message
      });
  }
}
