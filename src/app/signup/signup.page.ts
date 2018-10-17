import { Component, OnInit, OnDestroy } from '@angular/core';
import { SessionService } from '../services/session.service';
import {  MenuController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { IAppStore } from '../store/app.state';
import { SignupAction } from '../store/state/session.state';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit, OnDestroy {
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

  goToLogin () {
    this.router.navigate(['/login']);
  }

  signup(newUser) {
    this.store.dispatch(new SignupAction(newUser));
  }

  signupError(event) {
    this.loadSimpleToast(event.message);
  }

  async loadSimpleToast (message) {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 1000,
      position: 'top'
    });
    toast.present();
  }

}
