import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { environment } from 'src/environments/environment';
import { Http } from '@angular/http';
import * as auth0 from 'auth0-js';

const TOKEN_KEY = 'auth-token';

@Injectable()
export class AuthenticationService {

  auth0 = new auth0.WebAuth(environment.auth0Config);

  authenticationState = new BehaviorSubject(false);

  constructor(private storage: Storage,
    private http: Http,
    private plt: Platform) {
    this.plt.ready().then(() => {
      this.checkToken();
    });
  }

  checkToken() {
    this.storage.get(TOKEN_KEY).then(res => {
      if (res) {
        this.authenticationState.next(true);
      }
    });
  }

 /* login(user: any) {
    return this.storage.set(TOKEN_KEY, 'Bearer 1234567').then(() => {
      this.authenticationState.next(true);
    });
  }*/


  login(): void {
    this.auth0.authorize(
      { prompt: 'login' }
    );
  }


  logout() {
    return this.storage.remove(TOKEN_KEY).then(() => {
      this.authenticationState.next(false);
    });
  }

  isAuthenticated() {
    return this.authenticationState.value;
  }

}
