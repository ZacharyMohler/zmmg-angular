import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { GamesEntry } from '../games-list/games-list.component'
import { GamesDataService } from '../games-data.service';

@Component({
  selector: 'app-game-edit',
  templateUrl: './game-edit.component.html',
})
export class GameEditComponent implements OnInit
{

  public formError: string = '';
  public formSuccess: string = '';
  public formWarning: string = '';
  public warned: boolean = false;
  public updating: boolean = false;
  public id: string;

  public requiredFields: GamesEntry = {
    _id: '',
    title: '',
    platform: '',
    comments: ''
  };

  constructor(
    private activatedRoute: ActivatedRoute,
    private gamesDataService: GamesDataService
  ) { }

  ngOnInit()
  {
    //for update
    if (this.activatedRoute.snapshot.paramMap.get('id'))
    {
      this.updating = true;
      this.id = this.activatedRoute.snapshot.paramMap.get('id');
      this.gamesDataService.getGameById(this.id).then(foundGame => this.requiredFields = foundGame);
    }

  }

  //form update submit
  public onFormSubmit(): void
  {

    this.formError = '';
    if (!this.requiredFields.title || !this.requiredFields.platform)
    {
      this.formError = 'Title and Platform required!!!';
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
    this.gamesDataService.updateGame(this.requiredFields, this.id)
      .then(() => this.formSuccess = 'Updated Successfully!')
      .catch((message) =>
      {
        this.formError = message
      });
  }

  //send create to data service
  private sendCreate(): void
  {
    this.gamesDataService.createGame(this.requiredFields)
      .then(() => this.formSuccess = 'Created Successfully!')
      .catch((message) =>
      {
        this.formError = message
      });
  }

  //send delete to data service
  private sendDelete(): void
  {
    this.gamesDataService.deleteGame(this.id)
      .then(() => this.formSuccess = 'Deleted Successfully!')
      .catch((message) =>
      {
        this.formError = message
      });
  }
}
