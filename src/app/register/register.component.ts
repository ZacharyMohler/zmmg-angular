import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 
import { AuthenticationService } from '../authentication.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit
{

  public formError: string = '';

  public credentials = {
    email: '',
    password: ''
  };

  public pageContent = {
    header:
    {
      title: 'Create a new account',
      strapline: ''
    },
    sidebar: ''
  };

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit()
  {
  }

  //register submit event handler (errors)
  public onRegisterSubmit(): void
  {
    this.formError = '';

    if (!this.credentials.email || !this.credentials.password)
    {
      this.formError = 'All fields are required!';
    }
    else
    {
      this.doRegister();
    }
  }

  //actual register push-through
  private doRegister(): void
  {
    this.authenticationService.register(this.credentials)
      .then(() => this.router.navigateByUrl('/'))
      .catch((message) => this.formError = message);
  }
}
