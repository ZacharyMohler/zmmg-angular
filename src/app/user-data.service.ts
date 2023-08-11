import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { User } from './user';
import { AuthResponse } from './authresponse'

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

//            CONSTRUCTOR
  constructor(private http: HttpClient)
  {

  }
//            BOTTOM TEXT

  private apiBaseUrl = 'http://localhost:3000/api';

  public login(user: User): Promise<AuthResponse>
  {
    return this.makeAuthApiCall('login', user);
  }

  public register(user: User): Promise<AuthResponse>
  {
    return this.makeAuthApiCall('register', user);
  }

  private makeAuthApiCall(urlPath: string, user: User): Promise<AuthResponse>
  {
    const url: string = `${this.apiBaseUrl}/${urlPath}`;
    return this.http
      .post(url, user)
      .toPromise()
      .then(response => response as AuthResponse)
      .catch(this.handleError);
  }
  

  private handleError(error: any): Promise<any>
  {
    console.error('Something has gone wrong', error);
    return Promise.reject(error.message || error);
  }
}
