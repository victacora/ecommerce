import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router, RouterEvent, NavigationEnd } from '@angular/router';
import { AuthenticationService } from './shared/service/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {

  public appPages = [
    {
      title: 'Empresas',
      url: '/company'
    },
    {
      title: 'Personas',
      url: '/person'
    },
    {
      title: 'Productos',
      url: '/product'
    },
    {
      title: 'Ordenes',
      url: '/order'
    }
  ];

  currentPage;


  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    this.initializeApp();
    router.events.subscribe((event: RouterEvent) => {
      if (event instanceof NavigationEnd) {
        this.currentPage = { url: event.url };
      }
    });
  }

  initializeApp() {
    this.currentPage = !!this.router.url ? this.appPages[0] : { url: this.router.url };
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.authenticationService.authenticationState.subscribe(state => {
        debugger
        if (state) {
          this.router.navigate(['company']);
        } else {
          this.router.navigate(['login']);
        }
      });
    });
  }

  onItemClicked(page) {
    this.currentPage = page;
  }

  isCurrentPage(page) {
    return (this.currentPage.url.includes(page.url));
  }

  logout() {
    this.authenticationService.logout();
  }

}
