import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { MusicEntry } from '../music-list/music-list.component'
import { MusicDataService } from '../music-data.service';

@Component({
  selector: 'app-music-edit',
  templateUrl: './music-edit.component.html',
})
export class MusicEditComponent implements OnInit
{

  public formError: string = '';
  public formSuccess: string = '';
  public formWarning: string = '';
  public warned: boolean = false;
  public updating: boolean = false;
  public id: string;

  public requiredFields: MusicEntry = {
    _id: '',
    title: '',
    artist: '',
    format: '',
    comments: '',
    otherIdentifier: ''
  };

  constructor(
    private activatedRoute: ActivatedRoute,
    private musicDataService: MusicDataService
  ) { }

  ngOnInit()
  {
    //for update
    if (this.activatedRoute.snapshot.paramMap.get('id'))
    {
      this.updating = true;
      this.id = this.activatedRoute.snapshot.paramMap.get('id');
      this.musicDataService.getMusicById(this.id).then(foundMusic => this.requiredFields = foundMusic);
    }

  }

  //form update submit
  public onFormSubmit(): void
  {

    this.formError = '';
    if (!this.requiredFields.title || !this.requiredFields.artist || !this.requiredFields.format)
    {
      this.formError = 'Title, Artist, and Format required!!!';
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
    this.musicDataService.updateMusic(this.requiredFields, this.id)
      .then(() => this.formSuccess = 'Updated Successfully!')
      .catch((message) =>
      {
        this.formError = message
      });
  }

  //send create to data service
  private sendCreate(): void
  {
    this.musicDataService.createMusic(this.requiredFields)
      .then(() => this.formSuccess = 'Created Successfully!')
      .catch((message) =>
      {
        this.formError = message
      });
  }

  //send delete to data service
  private sendDelete(): void
  {
    this.musicDataService.deleteMusic(this.id)
      .then(() => this.formSuccess = 'Deleted Successfully!')
      .catch((message) =>
      {
        this.formError = message
      });
  }
}
