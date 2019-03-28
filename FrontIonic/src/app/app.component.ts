import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

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
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.currentPage = this.appPages[0];
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  onItemClicked(page) {
    this.currentPage = page;
  }

  isCurrentPage(page) {
    return (page.title === this.currentPage.title);
  }

}
