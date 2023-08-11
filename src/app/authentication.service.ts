import { Inject, Injectable } from '@angular/core';
import { BROWSER_STORAGE } from './storage';
import { User } from './user';
import { AuthResponse } from './authresponse';
import { UserDataService } from './user-data.service'

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(@Inject(BROWSER_STORAGE) private storage: Storage,
    private userDataService: UserDataService) { }

  //=========== TOKEN MANAGEMENT ==========================
  //get token from local storage
  public getToken(): string
  {
    return this.storage.getItem('zmmg-token');
  }

  //save token to local storage
  public saveToken(token: string): void
  {
    this.storage.setItem('zmmg-token', token);
  }

  //delete token from local storage
  public logout(): void
  {
    this.storage.removeItem('zmmg-token');
  }

  //=========== SESSION MANAGEMENT ==========================

  //try to login
  public login(user: User): Promise<any>
  {
    return this.userDataService.login(user)
      .then((authResp: AuthResponse) => this.saveToken(authResp.token));
  }

  //register new user
  public register(user: User): Promise<any>
  {
    return this.userDataService.register(user)
      .then((authResp: AuthResponse) => this.saveToken(authResp.token));
  }

  //determine logged in status
  public isLoggedIn(): boolean
  {
    const token: string = this.getToken();

    //if token exists, make sure it's not expired
    if (token)
    {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp > (Date.now() / 1000);
    }
    //no token
    else
    {
      return false;
    }
  }

  //get the current user
  public getCurrentUser(): User
  {
    if (this.isLoggedIn())
    {
      const token: string = this.getToken();
      const { email } = JSON.parse(atob(token.split('.')[1]));
      return { email } as User;
    }
  }


}
