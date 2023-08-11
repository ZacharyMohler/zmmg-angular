import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { User } from '../user';

@Component({
  selector: 'app-framework',
  templateUrl: './framework.component.html',
  styles: []
})
export class FrameworkComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit() {
  }

  public doLogout(): void
  {
    this.authenticationService.logout();
  }

  public isLoggedIn(): boolean
  {
    return this.authenticationService.isLoggedIn();
  }

  public getUsername(): string
  {
    const user: User = this.authenticationService.getCurrentUser();
    return user ? user.email : 'guest';
  }

}
