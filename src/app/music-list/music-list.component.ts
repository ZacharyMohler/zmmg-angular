import { Component, OnInit } from '@angular/core';
import { MusicDataService } from '../music-data.service';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../authentication.service';

export class MusicEntry
{
  _id: string;
  title: string;
  artist: string;
  format: string;
  comments: string;
  otherIdentifier: string;
}
@Component({
  selector: 'app-music-list',
  templateUrl: '/music-list.component.html',
  styles: []
})

export class MusicListComponent implements OnInit
{
  toSearch: string;
  constructor(private route: ActivatedRoute, private musicDataService: MusicDataService, private authenticationService: AuthenticationService) { }

  private musicList: MusicEntry[];

  private getMusic(): void
  {
    this.musicDataService
      .getMusic()
      .then(foundMusic => this.musicList = foundMusic);
  }

  private getMusicSearch(toSearch: string): void
  {
    this.musicDataService
      .getMusicSearch(toSearch)
      .then(foundMusic => this.musicList = foundMusic);
  }

  private getMusicFormat(format: string): void
  {
    this.musicDataService
      .getMusicFormat(format)
      .then(foundMusic => this.musicList = foundMusic);
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
      this.getMusicSearch(this.toSearch);
    }

    //if format is present in req params, get based on format
    else if (this.route.snapshot.paramMap.get('format'))
    {
      this.getMusicFormat(this.route.snapshot.paramMap.get('format'));
    }

    //otherwise get all
    else
    {
      this.getMusic();
    }

  }

}
