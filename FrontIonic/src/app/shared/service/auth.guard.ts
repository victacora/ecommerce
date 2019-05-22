import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { CanActivate } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(public auth: AuthenticationService) { }

  canActivate(): boolean {
    return this.auth.isAuthenticated();
  }
}
