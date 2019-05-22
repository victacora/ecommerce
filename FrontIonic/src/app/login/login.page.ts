import { Component, AfterViewInit, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/shared/service/authentication.service';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  template: ''
})

export class LoginPage {

  constructor(
    private authService: AuthenticationService) {
      this.authService.login();
  }

}


