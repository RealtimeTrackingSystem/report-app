import { IAppStore } from './../store/app.state';
import { Store } from '@ngrx/store';
import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';
import { LogoutAction } from '../store/state/session.state';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  constructor (
    private menuCtrl: MenuController,
    private router: Router,
    private store: Store<IAppStore>,
  ) {
    this.menuCtrl.enable(true);
  }
  logout () {
    return new Promise((resolve: any) => {
      resolve(this.store.dispatch(new LogoutAction()));
    })
    .then(() => {
      this.router.navigate(['/login']);
    });
  }
}
