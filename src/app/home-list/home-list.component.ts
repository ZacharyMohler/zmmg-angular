import { Component, OnInit } from '@angular/core';
import { MoviesDataService } from '../movies-data.service';

//class for the collections lists
export class CollectionsList
{
  media: string;
  formats: string[];
}

export class CountsList
{
  counts: number[];
}

@Component({
  selector: 'app-collections-list',
  templateUrl: './home-list.component.html',
  styles: ['./home-list.component.css']
})


export class HomeListComponent implements OnInit
{
  constructor(private moviesDataService: MoviesDataService) { }

  public counts: number[];

  public collections: CollectionsList[] = [
      {
        media: 'Movies',
        formats: ['All Formats', 'Beta', 'Blu-Ray', 'CED', 'DVD', 'Film', 'Laserdisc', 'VHS']
      },
      {
        media: 'Music',
        formats: ['All Formats', '8-track', 'Cassette', 'CD', 'Player Piano Roll', 'Reel to Reel', 'Shellac Record', 'Vinyl']
      },
      {
        media: 'Games',
        formats: ['All Consoles', '3DO', '3DS', 'Dreamcast', 'DS', 'GameBoy', 'GameBoy Color', 'GameBoy Advance', 'Mac', 'Sega Genesis', 'N64', 'NES', 'PC', 'PS1', 'PS2', 'PS3', 'PS4', 'PSP', 'Sega Saturn', 'SNES', 'XBOX', 'XBOX 360', 'XBOX One']
      },
      {
        media: 'Books',
        formats: ['All Books', '< 1900', '1900 - 1949', '1950 - 1999', '> 2000']
      }];

  
  private getCounts(): void
  {
    this.moviesDataService
      .getCounts()
      .then(foundCounts => this.counts = foundCounts);
  }

  ngOnInit()
  {
    this.getCounts();
  }

}
