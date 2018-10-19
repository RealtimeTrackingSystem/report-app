import { Component, OnInit, OnDestroy } from '@angular/core';
import { SessionService } from '../services/session.service';
import {  MenuController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { IAppStore } from '../store/app.state';
import { LoginAction } from '../store/state/session.state';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit, OnDestroy {
  private sessionSubscription: Subscription;
  constructor(
    private sessionService: SessionService,
    private menuCtrl: MenuController,
    private router: Router,
    private store: Store<IAppStore>,
    private toastCtrl: ToastController
  ) {
    this.menuCtrl.enable(false);
  }

  ngOnInit() {
    this.sessionSubscription = this.store.select('session')
          .subscribe(
            userState => {
              if (userState.session) {
                console.log(userState);
                this.router.navigate(['/home']);
              } else if (userState.error) {
                this.loadSimpleToast(userState.error);
              }
            }
          );
  }

  ngOnDestroy() {
    this.sessionSubscription.unsubscribe();
  }

  login ({loginName, password}) {
    this.store.dispatch(new LoginAction(loginName, password));
  }

  formError({ message }) {
    this.loadSimpleToast(message);
  }

  goToSignup () {
    this.router.navigate(['/signup']);
  }

  async loadSimpleToast (message) {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 15000,
      position: 'top'
    });
    toast.present();
  }
}
