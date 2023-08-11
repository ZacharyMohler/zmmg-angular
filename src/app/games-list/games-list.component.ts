import { Component, OnInit } from '@angular/core';
import { GamesDataService } from '../games-data.service';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../authentication.service';

export class GamesEntry
{
  _id: string;
  title: string;
  platform: string;
  comments: string;
}
@Component({
  selector: 'app-games-list',
  templateUrl: '/games-list.component.html',
  styles: []
})

export class GamesListComponent implements OnInit
{
  toSearch: string;
  constructor(private route: ActivatedRoute, private gamesDataService: GamesDataService, private authenticationService: AuthenticationService) { }

  private gamesList: GamesEntry[];

  private getGames(): void
  {
    this.gamesDataService
      .getGames()
      .then(foundGames => this.gamesList = foundGames);
  }

  private getGamesSearch(toSearch: string): void
  {
    this.gamesDataService
      .getGamesSearch(toSearch)
      .then(foundGames => this.gamesList = foundGames);
  }

  private getGamesFormat(platform: string): void
  {
    this.gamesDataService
      .getGamesPlatform(platform)
      .then(foundGames => this.gamesList = foundGames);
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
      this.getGamesSearch(this.toSearch);
    }

    //if format is present in req params, get based on format
    else if (this.route.snapshot.paramMap.get('format'))
    {
      this.getGamesFormat(this.route.snapshot.paramMap.get('format'));
    }

    //otherwise get all
    else
    {
      this.getGames();
    }

  }

}
